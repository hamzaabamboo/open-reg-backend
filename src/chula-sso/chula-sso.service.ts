import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import {
    ChulaSsoSuccessResponse,
    ChulaSsoFailedResponse,
} from './chula-sso.dto';
import { parseStudentId } from './chula-sso.utils';

@Injectable()
export class ChulaSsoService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    async validateTicket(ticket: string): Promise<ChulaSsoSuccessResponse> {
        const { status, data } = await this.httpService
            .get<ChulaSsoSuccessResponse | ChulaSsoFailedResponse>(
                'https://account.it.chula.ac.th//serviceValidation',
                {
                    headers: {
                        DeeAppId: this.configService.chulaAppId,
                        DeeAppSecret: this.configService.chulaAppSecret,
                        DeeTicket: ticket,
                    },
                },
            )
            .toPromise();
        if (status !== 200) {
            throw new BadRequestException(data);
        }
        return data as ChulaSsoSuccessResponse;
    }

    parseStudentInfo(data: ChulaSsoSuccessResponse) {
        const { chulaId, year, faculty } = parseStudentId(data.ouid);
        const {
            firstname: firstNameEn,
            lastname: lastNameEn,
            firstnameth: firstName,
            lastnameth: lastName,
        } = data;
        return {
            chulaId,
            year,
            faculty,
            firstNameEn,
            lastNameEn,
            firstName,
            lastName,
        };
    }
}
