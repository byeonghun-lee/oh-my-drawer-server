import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailAuth, MailAuthDocument } from './mail-auth.schema';

@Injectable()
export class MailAuthService {
    constructor(
        @InjectModel(MailAuth.name)
        private readonly mailAuth: Model<MailAuthDocument>,
    ) {}

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
