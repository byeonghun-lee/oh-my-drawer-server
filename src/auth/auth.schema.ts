import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsEmail, IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {
    @Prop({
        required: true,
        unique: true,
    })
    @IsEmail()
    email: string;

    @IsString()
    phoneNumber: string;

    @Prop({
        unique: true,
    })
    @IsString()
    nickname: string;

    @Prop({
        required: true,
    })
    @IsString()
    hasdedPassword: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    expireAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
