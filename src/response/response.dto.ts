import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SubmitResponseDTO {
    @ApiModelProperty()
    @IsMongoId()
    form: string;

    @ApiModelProperty()
    @IsNotEmpty()
    answers: {
        [key: string]: string;
    };
}
