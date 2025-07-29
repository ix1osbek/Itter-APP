import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
    @ApiProperty({ example: "Ixlosbek Erkinov" })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    @Matches(/^[\p{L}\p{N}\s'-]+$/u, {
        message: 'F.I.Sh faqat harflar, sonlar va oddiy belgilarni o‘z ichiga olishi mumkin',
    })
    fullName?: string;

    @ApiProperty({ example: "Backend Developer", required: true })
    @IsNotEmpty({ message: "Iltimos content maydoni bo'sh bo'lmasligi kerak" })
    @Transform(({ value }) => value?.trim())
    @IsString()
    @MaxLength(80, { message: "Iltimos content 80 ta belgidan kam bo'lsin!" })
    content: string;


    @ApiProperty({ example: "O'zingiz haqingizda 280 ta belgidan kam bo'lgan ma'lumot!" })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    @MaxLength(80, { message: "Iltimos bio 280 ta belgidan kam bo'lsin!" })
    bio?: string;


    @ApiProperty({ example: "https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_profile-512.png" })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    avatarUrl?: string;
}
