import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private readonly userRepo: Repository<User>,
        private readonly emailService: EmailService
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




    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
