import { Body, Controller, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { createSurveyDto } from "../dto/survey/create-survey.dto";
import { ObjectId } from "mongodb";
import { updateSurveyDto } from "../dto/survey/update-survey.dto";
import { lastValueFrom } from "rxjs";

@Controller()
export class SurveyController {
    constructor(@Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy) { }

    @Post('survey/create-survey')
    async createSurvey(@Body() surveyData: any) {
        const value = await lastValueFrom(
            this.survey_client.send(
                { cmd: 'create_survey' },
                surveyData,
            )
        );
        return value;
    }

    @Get("survey/get-all-survey")
    async getAllSurvey() {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'get_all_survey' },
                {},
            )
        )
    }

    @Get("survey/get-survey/:id")
    async getSurvey(@Param("id") id: ObjectId) {

        if (!ObjectId.isValid(id)) {
            throw new Error("Object Id is invalid")
        }
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'get_survey' },
                id,
            )
        )
    }

    @Patch("survey/update-survey/:id")
    async updateSurvey(@Param("id") id: ObjectId, @Body() data: any) {
        if (!ObjectId.isValid(id)) {
            throw new Error("Object Id is invalid")
        }
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: "update_survey" },
                { id, data }
            )
        )
    }
}