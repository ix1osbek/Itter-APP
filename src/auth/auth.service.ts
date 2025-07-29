import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { verifyOtpDto } from './dto/verify_otp.dto';
import { AuthLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private readonly userRepo: Repository<User>,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService
    ) { }

    //////////// register
    async register(createAuthDto: CreateAuthDto) {
        try {
            const { email, password, username } = createAuthDto;
            const existingUser = await this.userRepo.findOne({ where: { email } })

            const hashedPassword = await bcrypt.hash(password, 10);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const now = new Date();

            if (existingUser && !existingUser.isVerified) {
                const diffMs = now.getTime() - new Date(existingUser.otpTime).getTime();
                const diffMinutes = diffMs / (1000 * 60);

                if (diffMinutes >= 2) {
                    existingUser.password = hashedPassword;
                    existingUser.otp = otp;
                    existingUser.otpTime = now;
                    await this.userRepo.save(existingUser);
                    await this.emailService.sendEmailOtp(email, otp);
                    return { message: "Yangi tasdiqlash kodingiz emailingizga yuborildi!" };
                }
                throw new ConflictException("Iltimos, 2 daqiqa kutib qayta urinib ko‘ring!");
            }


            if (existingUser && existingUser.isVerified) {
                throw new ConflictException("Bu foydalanuvchi bazamizda mavjud!");
            }


            const newUser = this.userRepo.create({
                username: username,
                email,
                password: hashedPassword,
                otp,
                otpTime: now,
            })

            await this.userRepo.save(newUser);
            await this.emailService.sendEmailOtp(email, otp);
            return { message: "Iltimos emailingizga yuborilgan kodni kiriting!" };
        } catch (error) {
            if (error instanceof ConflictException) throw error;

            if (error.code === '23505') {
                throw new ConflictException("Bu email allaqachon ro‘yxatdan o‘tgan!");
            }

            throw new InternalServerErrorException('Serverda xato yuz berdi');
        }
    }

    ///////////////////// verify otp

    async verifyOtp(iOTP_Dto: verifyOtpDto) {
        const { email, otp } = iOTP_Dto
        try {
            const foundetUser = await this.userRepo.findOne({ where: { email: email } })

            if (!foundetUser) {
                throw new NotFoundException('Foydalanuvchi topilmadi!')
            }

            const otpTime = foundetUser.otpTime;
            const currentTime = new Date();
            const timeDifference = (currentTime.getTime() - otpTime.getTime())
            if (timeDifference > 2 * 60 * 1000) {
                throw new ConflictException("OTP muddati tugagan!");
            }


            foundetUser.isVerified = true
            foundetUser.otp = ''
            foundetUser.otpTime = new Date(0)
            await this.userRepo.save(foundetUser)
            return { message: "Sizning emailingiz tasdiqlandi. Login qilishingiz mumkin!" }
        } catch (error) {
            if (error instanceof ConflictException || error instanceof NotFoundException) throw error

            throw new InternalServerErrorException('Serverda xatolik yuz berdi!')
        }
    }

    async login(logindto: AuthLoginDto, res: Response) {
        const { email, password } = logindto
        try {
            const user = await this.userRepo.findOne({ where: { email } })

            if (!user) {
                throw new NotFoundException(`${email} siz ro'yxatdan o'tmagansiz.`)
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Kiritilgan parol xato!');
            }

            if (!user.isVerified) {
                throw new UnauthorizedException('Email manzili tasdiqlanmagan!')
            }
            const payload = { id: user.id, email: user.email, role: user.role }
            const accessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            })

            const refreshToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            })

            //////////// Refresh tokenni cookiega saqlash
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: false, // HTTPSda true
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/',
            })
            return {
                accessToken,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            }
        } catch (error) {
            if (error instanceof UnauthorizedException || NotFoundException) throw error
            console.log(error.message);

            throw new InternalServerErrorException('Serverda xato yuz berdi');

        }
    }

    //////////// refresh token
    async refreshToken(req: Request) {
        const token = req.cookies['refresh_token'];
        if (!token) throw new UnauthorizedException('Refresh token topilmadi!');

        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const newAccessToken = this.jwtService.sign(
                { id: payload.id, email: payload.email, role: payload.role },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                });

            return { accessToken: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Refresh token yaroqsiz!');
        }
    }


    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
