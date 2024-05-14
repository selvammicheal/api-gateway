import { IsBoolean, IsNotEmpty, IsNumber, IsString, isBoolean } from "class-validator";

export class createQuestionDto {
    @IsNotEmpty({message: "question should not be empty"})
    @IsString({message: "Question should be a string"})
    question: string

    @IsString({message: "QuestionImg should be string"})
    questionImg?: string

    @IsNotEmpty({message: "question_type_id should not be empty"})
    @IsString()
    question_type_id: string

    question_data?: string

    @IsNotEmpty({message: "section_id should not be empty"})
    @IsString()
    section_id: string

    @IsNotEmpty({message: "survey_id should not be empty"})
    @IsString()
    survey_id: string

    @IsNotEmpty({message: "mandatory should not be empty"})
    @IsBoolean()
    mandatory: boolean
}