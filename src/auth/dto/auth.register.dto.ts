import { IsEmail, IsString, MaxLength } from 'class-validator';

export class verifyEmailDto {
    @IsEmail()
    email: string;
}

export class AuthRegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @MaxLength(10)
    @IsString()
    nickname: string;

    @IsString()
    verificationCode: string;
}
