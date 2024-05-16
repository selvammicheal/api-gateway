import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { handleError } from '../error-handling';
import { ObjectId } from 'mongodb';
import { updateSectionDto } from 'src/dto/section/update-section.dto';

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
            return handleError(err);
        }
    }

    @Get("section/get-all-sections/:id")
    getAllSectionsBySurvey(@Param("id") id: ObjectId) {
        try {
            // if (!ObjectId.isValid(id)) {
            //     throw new Error("Object Id is invalid")
            // }
            return this.survey_client.send(
                { cmd: 'get_all_sections' },
                id,
            );
        } catch (err) {
            return handleError(err);
        }
    }

    @Patch("section/update-section/:id")
    updateQuestion(@Param("id") id: string, @Body() data: updateSectionDto) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error("Object Id is invalid")
            }
            return this.survey_client.send(
                { cmd: "update_section" },
                { id, data }
            )
        } catch (err) {
            handleError(err);
        }
    }

    @Delete('section/delete-section/:id')
    async deleteSection(@Param('id') id: string) {
        return this.survey_client.send(
            { cmd: "delete_section" },
            id
        )
    }
}
