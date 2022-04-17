import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as mongoose from 'mongoose';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    mongoose.set('debug', process.env.NODE_ENV === 'development');
    dayjs.extend(utc);
    dayjs.extend(timezone);

    dayjs.tz.setDefault('Asia/Seoul');

    await app.listen(3000);
}
bootstrap();
