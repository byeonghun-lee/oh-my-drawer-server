import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
    // private readonly awsConfig: AWS.Config;
    private readonly awsSes: AWS.SES;

    constructor(private readonly configService: ConfigService) {
        AWS.config.update({
            accessKeyId: this.configService.get('ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('SECRET_ACCESS_KEY'),
            region: this.configService.get('REGION'),
        });
        this.awsSes = new AWS.SES({ apiVersion: '2010-12-01' });
    }

    async sendEmail({
        toAddress,
        subject,
        message,
    }: {
        toAddress: string;
        subject: string;
        message: string;
    }) {
        const params = {
            Destination: {
                /* required */
                ToAddresses: [toAddress],
            },
            Message: {
                /* required */
                Body: {
                    /* required */
                    // Html: {
                    //     Charset: "UTF-8",
                    //     Data: "HTML_FORMAT_BODY",
                    // },
                    Text: {
                        Charset: 'UTF-8',
                        Data: message,
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject,
                },
            },
            Source: 'info@ohmydrawer.com' /* required */,
            ReplyToAddresses: ['info@ohmydrawer.com'],
        };

        try {
            await this.awsSes.sendEmail(params).promise();

            return;
        } catch (error) {
            console.log('Send email error:', error);
            throw new BadRequestException(
                `Send email error(${error.message}).`,
            );
        }
    }
}
