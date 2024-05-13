import { Body, Controller, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { createSurveyDto } from "./dto/survey/create-survey.dto";
import { ObjectId } from "mongodb";
import { updateSurveyDto } from "./dto/survey/update-survey.dto";
import { updateQuestionDto } from "./dto/question/update-question.dto";
import { updateQuestionTypeDto } from "./dto/question/update-question-type.dto";
import { handleError } from "./error-handling";

@Controller()
export class QuestionController {
    constructor(@Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy) { }

    @Post('question/create-question')
    createQuestion(@Body() questionData) {
        try {
            return this.survey_client.send(
                { cmd: 'create_question' },
                questionData,
            );
        } catch (err) {
            handleError(err);
        }
    }

    @Get("question/get-all-questions/:id")
    getQuestionsBySurvey(@Param("id") id: string,) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("Object Id is invalid")
            }
            return this.survey_client.send(
                { cmd: 'get_questions_by_survey' },
                id,
            );
        } catch (err) {
            handleError(err);
        }
    }

    @Patch("question/update-question/:id")
    updateQuestion(@Param("id") id: string, @Body() data: updateQuestionDto) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("Object Id is invalid")
            }
            return this.survey_client.send(
                { cmd: "update_question" },
                { id, data }
            )
        } catch (err) {
            handleError(err);
        }
    }

    @Patch("question/update-question-type/:id")
    updateQuestionType(@Param("id") id: string, @Body() data: updateQuestionTypeDto) {
        try {
            if (!ObjectId.isValid(data.question_type_id)) {
                throw new Error("Object Id is invalid")
            }
            const value: ObjectId = data.question_type_id;
            return this.survey_client.send(
                { cmd: "update_question_type" },
                { id, value }
            )
        } catch (error) {
            handleError(error)
        }
    }
}