import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import { UpdateProfileDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Patch('profile-update')
    @ApiOperation({ summary: 'Profilni tahrirlash' })
    @ApiResponse({ status: 201, description: 'profil tahrirlandi!' })
    @ApiResponse({ status: 401, description: "Mumkin bo'lmagan buyruq!" })
    @ApiResponse({ status: 404, description: "Foydalanuvchi topilmadi!" })
    @ApiResponse({ status: 500, description: 'Serverda xatolik yuz berdi.' })
    async updateProfile(
        @CurrentUser() user: User,
        @Body() updateDto: UpdateProfileDto,
    ): Promise<User> {
        return this.userService.updateProfile(user.id, updateDto);
    }

    @Get('all')
    @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish!' })
    @ApiResponse({ status: 200, description: 'Barcha foydalanuvchilar muvofaqiyatli topildi' })
    @ApiResponse({ status: 404, description: "Foydalanuvchilar topilmadi!" })
    @ApiResponse({ status: 500, description: 'Serverda xatolik yuz berdi.' })
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateProfileDto: UpdateProfileDto) {
        return this.userService.update(+id, UpdateProfileDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
