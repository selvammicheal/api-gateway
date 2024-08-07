import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Controller()
export class SurveyResponseController {
    constructor(@Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy) { }

    @Post('survey-response/submit-response')
    async submitResponseBySurvey(@Body() responses) {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'submit_response_by_survey' },
                responses,
            )
        )
    }

    @Get("survey-response/get-responses-by-survey/:id")
    async getResponsesBySurvey(@Param("id") id: string) {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'get_survey_responses_by_survey' },
                id,
            )
        )
    }

    @Get("survey-response/get-response")
    async getResponse(@Query("id") surveyId: string, @Query("email") email: string) {
        console.log(email)
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'get_survey_response' },
                {surveyId, email},
            )
        )
    }

    @Get("survey-response/check-if-survey-exists")
    async checkIfSurveyExists(@Query("id") surveyId: string, @Query("email") email: string) {
        console.log(email)
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'check_if_survey_exists' },
                {surveyId, email},
            )
        )
    }

}