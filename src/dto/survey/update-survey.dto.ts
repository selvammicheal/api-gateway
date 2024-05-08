import { PartialType } from "@nestjs/mapped-types";
import { createSurveyDto } from "./create-survey.dto";

export class updateSurveyDto extends PartialType(createSurveyDto){}