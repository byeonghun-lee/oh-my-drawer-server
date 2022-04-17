import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailAuthService } from './mail-auth.service';
import { MailAuth, MailAuthSchema } from './mail-auth.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MailAuth.name, schema: MailAuthSchema },
        ]),
    ],
    providers: [MailAuthService],
    exports: [MailAuthService],
})
export class MailAuthModule {}
