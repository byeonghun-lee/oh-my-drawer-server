import { Module } from '@nestjs/common';
import { MailAuthService } from './mail-auth.service';

@Module({
    providers: [MailAuthService],
})
export class MailAuthModule {}
