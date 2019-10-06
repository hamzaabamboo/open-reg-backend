import { ApiModelProperty } from '@nestjs/swagger';

export class ValidateTicketResponse {
    @ApiModelProperty()
    token: string;
}
