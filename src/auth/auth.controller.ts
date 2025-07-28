import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("register")
    @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
    @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi' })
    @ApiResponse({ status: 409, description: 'Email allaqachon ro‘yxatda bor' })
    @ApiResponse({status:500 , description: 'Serverda xatolik yuz berdi.'})
    async register(@Body() createAuthDto: CreateAuthDto) {
        await this.authService.register(createAuthDto);
        return { message: "Iltimos emailingizga yuborilgan kodni kiriting!" };
    }

    @Get()
    findAll() {
        return this.authService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authService.findOne(+id);
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
