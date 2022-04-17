import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsEmail, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type MailAuthDocument = MailAuth & Document;

@Schema()
export class MailAuth {
    @Prop({
        required: true,
    })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    @IsString()
    code: string;

    @Prop()
    @IsDate()
    expireAt: Date;
}

export const MailAuthSchema = SchemaFactory.createForClass(MailAuth);

MailAuthSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })
