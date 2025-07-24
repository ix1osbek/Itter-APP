import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class CreateAuthDto {
    @ApiProperty({ example: "ix1osbek", required: true })
    username: string

    @ApiProperty({ example: "bekerkinov2004@gmail.com", required: true })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'qwerty123',
        required: true
    })
    @IsNotEmpty({ message: "Iltimos password maydonini to'ldiring!" })
    @MinLength(8, { message: "Iltimos kiritlgan password 8 ta belgidan ko'p bo'lsin!" })
    @MaxLength(40, { message: "Iltimos password 40 ta belgidan kam bo'lsin!" })
    password: string
}
