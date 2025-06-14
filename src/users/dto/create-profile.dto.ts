/* eslint-disable prettier/prettier */
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    birthday?: string;

    @IsNumber()
    @IsOptional()
    height?: number;

    @IsNumber()
    @IsOptional()
    weight?: number;

    @IsArray()
    @IsOptional()
    interests?: string[];

    @IsString()
    @IsOptional()
    zodiac?: string;

    @IsString()
    @IsOptional()
    horoscope?: string;
}