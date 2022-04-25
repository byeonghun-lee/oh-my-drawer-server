import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsEmail, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
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
    hashedPassword: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    expireAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// AuthSchema.statics.findByIdentity = async function ({
//     email,
//     nickname,
// }: {
//     email: string;
//     nickname?: string;
// }): Promise<object> {
//     const query: { $or: Array<object> } = { $or: [{ email }] };

//     if (nickname) {
//         query.$or.push({ nickname });
//     }

//     return await this.findOne(query).lean();
// };

// method 선언 방식
// https://mongoosejs.com/docs/guide.html#es6-classes
