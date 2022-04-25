import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { Auth, AuthDocument } from './auth.schema';
import { convertHashedText } from '../common/helper';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name) private readonly auth: Model<AuthDocument>,
        private jwtService: JwtService,
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

        if (isExist) {
            throw new UnauthorizedException('Already exist user.');
        }

        return;
    }

    async create({
        email,
        password,
        nickname,
    }: {
        email: string;
        password: string;
        nickname: string;
    }) {
        const hashedPassword = await convertHashedText(password);
        return await this.auth.create({
            email,
            hashedPassword,
            nickname,
        });
    }

    generateToken({
        id,
        email,
        nickname,
    }: {
        id: string;
        email: string;
        nickname: string;
    }) {
        return this.jwtService.sign({ userId: id, id: email, nickname });
    }
}
