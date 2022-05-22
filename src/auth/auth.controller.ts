import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { MailAuthService } from '../mail-auth/mail-auth.service';
import { AuthRegisterDto, verifyEmailDto } from './dto/auth.register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly mailAuthService: MailAuthService,
    ) {}

    @Post('verify-email')
    async sendVerifyEmailCode(@Body() body: verifyEmailDto) {
        console.log('body:', body);
        await this.authService.checkExist({
            email: body.email,
        });
        await this.mailAuthService.create(body.email);
    }

    @Post()
    async register(
        @Res({ passthrough: true }) response: Response,
        @Body() body: AuthRegisterDto,
    ) {
        const { email, nickname, password, verificationCode } = body;
        await this.authService.checkExist({
            email,
            nickname,
        });

        await this.mailAuthService.checkMailAuth({
            email,
            code: verificationCode,
        });

        const createdAuth = await this.authService.create({
            email,
            password,
            nickname,
        });
        const serializedAuth = createdAuth.toJSON();
        delete serializedAuth.hashedPassword;

        await this.authService.jobOfInitRegister(serializedAuth);

        const token = this.authService.generateToken({
            id: serializedAuth._id,
            email: serializedAuth.email,
            nickname: serializedAuth.nickname,
        });
        response.cookie('access_token', token);
        return;
    }
}
