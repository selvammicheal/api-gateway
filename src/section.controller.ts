import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { handleError } from './error-handling';
import { ObjectId } from 'mongodb';

@Controller()
export class SectionController {
    constructor(@Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy) { }

    @Post('section/create-section')
    createSection(@Body() sectionData) {
        try {
            return this.survey_client.send(
                { cmd: 'create_section' },
                sectionData,
            );
        } catch (err) {
            handleError(err);
        }
    }

    @Get("section/get-all-sections/:id")
    getAllSectionsBySurvey(@Param("id") id: ObjectId) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("Object Id is invalid")
            }
            return this.survey_client.send(
                { cmd: 'get_all_sections' },
                id,
            );
        } catch (err) {
            handleError(err);
        }
    }
}
