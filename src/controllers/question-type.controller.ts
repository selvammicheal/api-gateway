import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { handleError } from "../error-handling";

@Controller()
export class QuestionTypeController {
    constructor(@Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy) { }

    @Post('question-type/create-question-type')
    createQuestionType(@Body() questionTypeData) {
        try {
            return this.survey_client.send(
                { cmd: 'create_question_type' },
                questionTypeData,
            );
        } catch (err) {
            handleError(err);
        }
    }

    @Get("question-type/get-all-question-type")
    getAllQuestionType() {
        try {
            return this.survey_client.send(
                { cmd: 'get_all_question_type' },
                {},
            );
        } catch (err) {
            handleError(err);
        }
    }

    @Get("question-type/get-question-type/:id")
    getQuestionType(@Param("id") id: string) {
        try {
            return this.survey_client.send(
                { cmd: 'get_question_type' },
                id,
            );
        } catch (err) {
            handleError(err);
        }
    }
}