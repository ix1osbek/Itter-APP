import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class verifyOtpDto {

    @ApiProperty({ example: "bekerkinov2004@gmail.com", required: true })
    @IsEmail()
    @IsNotEmpty({ message: "Iltimos email maydonini to'ldiring!" })
    @MaxLength(80, { message: "Iltimos email 80 ta belgidan kam bo'lsin!" })
    @MinLength(2 , {message: "Kiritilgan gmail 2 ta belgidan ko'p bo'lishi kerak."})
    email: string


    @ApiProperty({ example: '123456', required: true })
    @IsNotEmpty({ message: "Iltimos otp maydonini to'ldiring!" })
    @MaxLength(6, { message: "Iltimos OTP 6 ta belgidan kam bo'lsin!" })
    otp: string
}