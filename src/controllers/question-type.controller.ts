import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Controller()
export class QuestionTypeController {
    constructor(@Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy) { }

    @Post('question-type/create-question-type')
    async createQuestionType(@Body() questionTypeData) {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'create_question_type' },
                questionTypeData,
            )
        )
    }

    @Get("question-type/get-all-question-type")
    async getAllQuestionType() {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'get_all_question_type' },
                {},
            )
        );
    }

    @Get("question-type/get-question-type/:id")
    async getQuestionType(@Param("id") id: string) {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'get_question_type' },
                id,
            )
        )
    }
}