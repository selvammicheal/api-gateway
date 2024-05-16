import { IsBoolean, IsNotEmpty, IsNumber, IsString, isBoolean } from "class-validator";

export class createSectionDto {
    @IsNotEmpty({message: "name should not be empty"})
    @IsString({message: "name should be a string"})
    name: string

    @IsNotEmpty({message: "description should not be empty"})
    @IsString({message: "description should be string"})
    description: string

    @IsNotEmpty({message: "survey_id should not be empty"})
    @IsString({message: "survey_id should be string"})
    survey_id: string
}