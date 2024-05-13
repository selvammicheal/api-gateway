import { Body, Controller, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { createSurveyDto } from "../dto/survey/create-survey.dto";
import { ObjectId } from "mongodb";
import { updateSurveyDto } from "../dto/survey/update-survey.dto";
import { handleError } from "../error-handling";

@Controller()
export class SurveyController {
    constructor(@Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy) { }

    @Post('survey/create-survey')
    createSurvey(@Body() surveyData: createSurveyDto) {
        try{
            const value = this.survey_client.send(
                { cmd: 'create_survey' },
                surveyData,
            );
            return value;
        } catch(err) {
            handleError(err);
        }
    }

    @Get("survey/get-all-survey")
    getAllSurvey() {
        try {
            return this.survey_client.send(
                { cmd: 'get_all_survey' },
                {},
            );
        } catch(err) {
            handleError(err);
        }
    }

    @Get("survey/get-survey/:id")
    getSurvey(@Param("id") id: ObjectId) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("Object Id is invalid")
            }
            return this.survey_client.send(
                { cmd: 'get_survey' },
                id,
            );
        } catch(err) {
            handleError(err);
        }
    }

    @Patch("survey/update-survey/:id")
    updateSurvey(@Param("id") id: ObjectId, @Body() data: updateSurveyDto) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("Object Id is invalid")
            }
            return this.survey_client.send(
                { cmd: "update_survey" },
                { id, data }
            )
        } catch(err) {
            handleError(err);
        }
    }
}