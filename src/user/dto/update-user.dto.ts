// src/user/dto/update-profile.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProfileDto {
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    fullName?: string;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    content?: string;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    bio?: string;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    avatarUrl?: string;
}
