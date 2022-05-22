import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailAuthModule } from './mail-auth/mail-auth.module';
import { AwsModule } from './aws/aws.module';
import { BoxModule } from './box/box.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'development'
                    ? '.development.env'
                    : '.env',
        }),
        MongooseModule.forRoot(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        AuthModule,
        MailAuthModule,
        AwsModule,
        BoxModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
