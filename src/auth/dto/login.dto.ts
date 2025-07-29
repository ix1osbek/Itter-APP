import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
    @ApiProperty({ example: "ix1osbek yoki bekerkinov2004@gmail.com", required: true })
    @IsNotEmpty({ message: "Iltimos login qilayotganingizda maydon bo'sh bo'lmasligi kerak!" })
    @IsString({ message: "Kiritilgan username yoki gmail string ko'rinishida bo'lishi shart!" })
    identifier: string;


    @ApiProperty({
        example: 'qwerty123',
        required: true
    })
    @IsNotEmpty({ message: "Iltimos password maydonini to'ldiring!" })
    @MinLength(8, { message: "Iltimos kiritlgan password 8 ta belgidan ko'p bo'lsin!" })
    @MaxLength(40, { message: "Iltimos password 40 ta belgidan kam bo'lsin!" })
    password: string;
}
