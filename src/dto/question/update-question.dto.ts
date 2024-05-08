import { PartialType } from "@nestjs/mapped-types";
import { createQuestionDto } from "./create-question.dto";

export class updateQuestionDto extends PartialType(createQuestionDto){}