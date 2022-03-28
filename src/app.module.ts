import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

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
    ],
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService],
})
export class AppModule {}
