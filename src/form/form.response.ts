import { FormGroup } from './form-group.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Question, QuestionTypes } from './question.model';
import { Form } from './form.model';

export class FormGroupResponse implements FormGroup {
    @ApiModelProperty()
    _id: string;
    @ApiModelProperty()
    order: number;
    @ApiModelProperty()
    title: string;
    @ApiModelPropertyOptional()
    description?: string;
}

export class QuestionResponse implements Question {
    @ApiModelProperty()
    _id: string;
    @ApiModelProperty()
    order: number;
    @ApiModelProperty()
    group: number;
    @ApiModelProperty()
    type: QuestionTypes;
    @ApiModelProperty()
    label: string;
    @ApiModelProperty()
    key: string;
    @ApiModelProperty({ type: [String] })
    choices: string[];
    @ApiModelProperty()
    required: boolean;
    @ApiModelPropertyOptional()
    description?: string;
}

export class FormResponse implements Form {
    @ApiModelProperty()
    _id: string;
    @ApiModelProperty()
    eventId: string;
    @ApiModelProperty({ type: [FormGroupResponse] })
    groups: FormGroup[];
    @ApiModelProperty({ type: [QuestionResponse] })
    questions: Question[];
    @ApiModelProperty()
    title: string;
    @ApiModelPropertyOptional()
    description?: string;
}
