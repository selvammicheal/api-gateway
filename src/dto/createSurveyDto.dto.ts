import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createSurveyDto {
    @IsNotEmpty({message: "Please enter a name"})
    @IsString({message: "Name should be a string"})
    name: string

    @IsNotEmpty({message: "Please enter a description"})
    @IsString({message: "Description should be string"})
    description: string

    @IsNotEmpty()
    @IsString()
    ownerId: string
}