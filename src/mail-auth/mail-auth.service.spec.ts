import { Test, TestingModule } from '@nestjs/testing';
import { MailAuthService } from './mail-auth.service';

describe('MailAuthService', () => {
    let service: MailAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MailAuthService],
        }).compile();

        service = module.get<MailAuthService>(MailAuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
