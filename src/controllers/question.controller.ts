import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { createSurveyDto } from "../dto/survey/create-survey.dto";
import { ObjectId } from "mongodb";
import { updateSurveyDto } from "../dto/survey/update-survey.dto";
import { updateQuestionDto } from "../dto/question/update-question.dto";
import { updateQuestionTypeDto } from "../dto/question/update-question-type.dto";
import { lastValueFrom } from "rxjs";

@Controller()
export class QuestionController {
    constructor(@Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy) { }

    @Post('question/create-question')
    async createQuestion(@Body() questionData) {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'create_question' },
                questionData,
            )
        )
    }

    @Get("question/get-all-questions/:id")
    async getQuestionsBySurvey(@Param("id") id: string,) {
        if (!ObjectId.isValid(id)) {
            throw new Error("Object Id is invalid")
        }
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'get_questions_by_survey' },
                id,
            )
        )
    }

    @Patch("question/update-question/:id")
    async updateQuestion(@Param("id") id: string, @Body() data: updateQuestionDto) {
        if (!ObjectId.isValid(id)) {
            throw new Error("Object Id is invalid")
        }
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: "update_question" },
                { id, data }
            )
        )
    }

    @Patch("question/update-question-type/:id")
    async updateQuestionType(@Param("id") id: string, @Body() data) {
        // if (!ObjectId.isValid(data.question_type_id)) {
        //     throw new Error("Object Id is invalid")
        // }
        // const value: ObjectId = data.question_type_id;
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: "update_question_type" },
                { id, data }
            )
        )
    }

    @Delete('question/delete-question/:id')
    async deleteQuestion(@Param('id') id: string) {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: "delete_question" },
                id
            )
        )
    }
}