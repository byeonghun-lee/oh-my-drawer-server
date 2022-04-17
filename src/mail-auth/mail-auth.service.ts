import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as dayjs from 'dayjs';

import { MailAuth, MailAuthDocument } from './mail-auth.schema';
import { makeRandomId } from 'src/common/helper';

@Injectable()
export class MailAuthService {
    constructor(
        @InjectModel(MailAuth.name)
        private readonly mailAuth: Model<MailAuthDocument>,
    ) {}

    async create(email: string) {
        if (!email) {
            throw new BadRequestException('Email is required.');
        }

        const mailAuth = await this.mailAuth
            .findOne({ email })
            .select('expireAt')
            .lean();

        if (mailAuth && dayjs().diff(mailAuth.expireAt, 's') < 120) {
            throw new BadRequestException('Too many request.');
        }

        const verifyCode = makeRandomId(7);

        try {
            await this.mailAuth.updateOne(
                { email },
                {
                    email,
                    code: verifyCode,
                    expireAt: dayjs().add(10, 'm'),
                },
                { upsert: true },
            );
        } catch (error) {
            console.log('error:', error);
        }
    }

    async checkMailAuth({ email, code }: { email: string; code: string }) {
        if (!code) {
            throw new BadRequestException('Code is required.');
        }

        const mailAuth = await this.mailAuth.findOne({ email, code }).lean();

        if (mailAuth) {
            return { email: mailAuth.email };
        } else {
            throw new NotFoundException();
        }
    }
}
