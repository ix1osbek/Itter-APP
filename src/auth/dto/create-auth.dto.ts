import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateAuthDto {
    @ApiProperty({ example: "ix1osbek", required: true })
    @IsNotEmpty({ message: "Iltimos username maydoni bo'sh bo'lmasligi kerak" })
    @IsString({ message: "Kiritilgan username string ko'rinishida bo'lishi shart!" })
    @MinLength(3, { message: "Iltimos kiritlgan username 3 ta belgidan ko'p bo'lsin!" })
    @MaxLength(30, { message: "Iltimos username 30 ta belgidan kam bo'lsin!" })
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message: 'Username faqat harf, raqam va _ belgidan iborat bo‘lishi kerak',
    })
    username: string

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

    @ApiProperty({ example: "Ixlosbek Erkinov", required: true })
    @IsNotEmpty({ message: "Iltimos Fullname maydoni bo'sh bo'lmasligi kerak" })
    @IsString({ message: "Kiritilgan Fullname string ko'rinishida bo'lishi shart!" })
    @MinLength(3, { message: "Iltimos kiritlgan Full name 3 ta belgidan ko'p bo'lsin!" })
    @MaxLength(80, { message: "Iltimos Fullname 80 ta belgidan kam bo'lsin!" })
    @Matches(/^[\p{L}\p{N}\s'-]+$/u, {
        message: 'Fullname faqat harflar, sonlar va oddiy belgilarni o‘z ichiga olishi mumkin',
    })
    fullName: string

    @IsNotEmpty({ message: "Iltimos password maydonini to'ldiring!" })
    @MinLength(8, { message: "Iltimos kiritlgan password 8 ta belgidan ko'p bo'lsin!" })
    @MaxLength(40, { message: "Iltimos password 40 ta belgidan kam bo'lsin!" })
    @Matches(/^[\p{L}\p{N}\s'-]+$/u, {
        message: 'password faqat harflar, sonlar va oddiy belgilarni o‘z ichiga olishi mumkin',
    })
    password: string
}
