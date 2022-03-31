import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name) private readonly auth: Model<AuthDocument>,
    ) {}

    async checkExist({
        email,
        nickname,
    }: {
        email: string;
        nickname?: string;
    }) {
        const query: { $or: Array<object> } = { $or: [{ email }] };
        if (nickname) {
            query.$or.push({ nickname });
        }
        const isExist = await this.auth.findOne(query).select('_id').lean();
        console.log('isExist:', isExist);

        if (isExist) {
            throw new UnauthorizedException('Already exist user.');
        }

        return;
    }
}
