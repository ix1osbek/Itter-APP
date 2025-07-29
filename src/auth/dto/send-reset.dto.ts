import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SendResetDto {
    @ApiProperty({ example: "bekerkinov2004@gmail.com", required: true })
    @IsNotEmpty({ message: 'Email bo‘sh bo‘lmasligi kerak' })
    @IsEmail()
    @MaxLength(80, { message: "Iltimos email 80 ta belgidan kam bo'lsin!" })
    @MinLength(2, { message: "Kiritilgan gmail 2 ta belgidan ko'p bo'lishi kerak." })
    email: string;
}