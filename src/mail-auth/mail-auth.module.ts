import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailAuthService } from './mail-auth.service';
import { MailAuth, MailAuthSchema } from './mail-auth.schema';
import { AwsModule } from '../aws/aws.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MailAuth.name, schema: MailAuthSchema },
        ]),
        AwsModule,
    ],
    providers: [MailAuthService],
    exports: [MailAuthService],
})
export class MailAuthModule {}
