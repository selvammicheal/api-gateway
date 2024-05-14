import { IsBoolean, IsNotEmpty, IsNumber, IsString, isBoolean } from "class-validator";
import { ObjectId } from "mongodb";

export class updateQuestionTypeDto {
    @IsNotEmpty({message: "question_type_id should not be empty"})
    @IsString({message: "question_type_id should be a string"})
    question_type_id: ObjectId;
}