import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { verifyOtpDto } from './dto/verify_otp.dto';
import { Response } from 'express';
import { AuthLoginDto } from './dto/login.dto';

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

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
        return this.authService.update(+id, updateAuthDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authService.remove(+id);
    }
}
