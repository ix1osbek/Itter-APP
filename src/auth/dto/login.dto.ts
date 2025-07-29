import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
    @ApiProperty({ example: "bekerkinov2004@gmail.com", required: true })
    @IsNotEmpty({ message: 'Email bo‘sh bo‘lmasligi kerak' })
    @IsEmail()
    @MaxLength(80, { message: "Iltimos email 80 ta belgidan kam bo'lsin!" })
    @MinLength(2, { message: "Kiritilgan gmail 2 ta belgidan ko'p bo'lishi kerak." })
    email: string

    @ApiProperty({
        example: 'qwerty123',
        required: true
    })
    @IsNotEmpty({ message: "Iltimos password maydonini to'ldiring!" })
    @MinLength(8, { message: "Iltimos kiritlgan password 8 ta belgidan ko'p bo'lsin!" })
    @MaxLength(40, { message: "Iltimos password 40 ta belgidan kam bo'lsin!" })
    @Matches(/^[\p{L}\p{N}\s'-]+$/u, {
        message: 'password faqat harflar, sonlar va oddiy belgilarni o‘z ichiga olishi mumkin',
    })
    password: string;
}
