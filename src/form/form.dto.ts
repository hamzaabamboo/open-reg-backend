import {
    IsString,
    IsArray,
    ValidateNested,
    IsIn,
    IsBoolean,
    IsOptional,
    IsMongoId,
    IsInt,
} from 'class-validator';
import { QUESTION_TYPES, Question, QuestionTypes } from './question.model';
import { Type } from 'class-transformer';
import { Form } from './form.model';
import { FormGroup } from './form-group.model';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
export class QuestionDTO implements Question {
    @ApiModelProperty()
    @IsIn(QUESTION_TYPES)
    type: QuestionTypes;

    @ApiModelProperty()
    @IsString()
    label: string;

    @ApiModelProperty()
    @IsString()
    key: string;

    @ApiModelProperty()
    @IsInt()
    group: number;

    @ApiModelProperty()
    @IsInt()
    order: number;

    @ApiModelProperty({ type: [String] })
    @IsOptional()
    @IsArray()
    choices: string[];

    @ApiModelProperty()
    @IsOptional()
    @IsBoolean()
    required: boolean;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    description?: string;
}

export class FormGroupDTO implements FormGroup {
    @ApiModelProperty()
    @IsInt()
    order: number;

    @ApiModelProperty()
    @IsString()
    title: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;
}

export class CreateFormDTO implements Form {
    @ApiModelProperty()
    @IsMongoId()
    eventId: string;

    @ApiModelProperty()
    @IsString()
    title: string;

    @ApiModelProperty({ type: [FormGroupDTO] })
    @ValidateNested({ each: true })
    @Type(() => FormGroupDTO)
    groups: FormGroupDTO[];

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiModelProperty({ type: [QuestionDTO] })
    @ValidateNested({ each: true })
    @Type(() => QuestionDTO)
    questions: QuestionDTO[];
}
