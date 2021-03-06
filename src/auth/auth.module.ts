import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './auth.schema';
import { Box, BoxSchema } from '../box/box.schema';
import { AuthService } from './auth.service';
import { MailAuthModule } from '../mail-auth/mail-auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
        MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }]),
        MailAuthModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '7d' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
