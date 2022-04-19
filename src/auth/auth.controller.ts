import { Body, Controller, Post } from '@nestjs/common';
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
    async register(@Body() body: AuthRegisterDto) {
        // 가입 확인
        await this.authService.checkExist({
            email: body.email,
            nickname: body.nickname,
        });
        // 이메일 확인
        // 유저 생성
        // 유저 초기화
        // 유저 응답 만들어주기 and 비밀번호는 제거
        // 토큰만들고 cookie에 넣어주기
        console.log('body:', body);
    }
}
