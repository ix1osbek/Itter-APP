import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { verifyOtpDto } from './dto/verify_otp.dto';
import { Request, Response } from 'express';
import { AuthLoginDto } from './dto/login.dto';
import { SendResetDto } from './dto/send-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("register")
    @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
    @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi' })
    @ApiResponse({ status: 409, description: 'Email allaqachon ro‘yxatda bor' })
    @ApiResponse({ status: 500, description: 'Serverda xatolik yuz berdi.' })
    async register(@Body() createAuthDto: CreateAuthDto) {
        await this.authService.register(createAuthDto);
        return { message: "Iltimos emailingizga yuborilgan kodni kiriting!" };
    }

    @Post('verify_otp')
    @ApiOperation({ summary: "Foydalanuvchini emailini tasdiqlashi!" })
    @ApiResponse({ status: 200, description: 'Foydalanuvchi emaili tasdiqlandi!' })
    @ApiResponse({ status: 401, description: 'Noto‘g‘ri email yoki parol' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async findAll(@Body() iOTP_dto: verifyOtpDto) {
        await this.authService.verifyOtp(iOTP_dto);
        return { message: 'Emailingiz tasdiqlandi. Login qilishingiz mumkin!' }
    }

    @Post("login")
    @ApiOperation({ summary: "Foydalanuvchini tizimga kirishi" })
    @ApiResponse({ status: 200, description: 'Foydalanuvchi tizimga kirdi' })
    @ApiResponse({ status: 401, description: 'Noto‘g‘ri email yoki parol' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async login(@Body() dto: AuthLoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(dto, res)
    }

    @Post("refresh")
    @ApiOperation({ summary: 'Tokenni yangilash' })
    @ApiResponse({ status: 200, description: 'Token yangilandi' })
    @ApiResponse({ status: 401, description: 'Token noto‘g‘ri' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async refresh(@Req() req: Request) {
        return this.authService.refreshToken(req);
    }

    @Post('logout')
    @ApiOperation({ summary: 'Foydalanuvchini tizimdan chiqishi' })
    @ApiResponse({ status: 200, description: 'Foydalanuvchi tizimdan chiqdi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        });

        return { message: 'Tizimdan chiqildi' };
    }


    @Post('forgot_password')
    @ApiOperation({ summary: 'Parolni tiklash uchun kod yuborish' })
    @ApiResponse({ status: 200, description: 'Parolni tiklash uchun kod yuborildi' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async sendResetCode(@Body() dto: SendResetDto) {
        return this.authService.sendResetCode(dto)
    }


    @Post('reset_password')
    @ApiOperation({ summary: 'Parolni tiklash' })
    @ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli tiklandi' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto)
    }
}
