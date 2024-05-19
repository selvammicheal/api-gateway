import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ObjectId } from 'mongodb';
import { lastValueFrom } from 'rxjs';
import { updateSectionDto } from 'src/dto/section/update-section.dto';

@Controller()
export class SectionController {
    constructor(@Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy) { }

    @Post('section/create-section')
    async createSection(@Body() sectionData) {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'create_section' },
                sectionData,
            )
        )
    }

    @Get("section/get-all-sections/:id")
    async getAllSectionsBySurvey(@Param("id") id: ObjectId) {

        return await lastValueFrom(
            this.survey_client.send(
                { cmd: 'get_all_sections' },
                id,
            )
        )
    }

    @Patch("section/update-section/:id")
    async updateQuestion(@Param("id") id: string, @Body() data: updateSectionDto) {
        if (!ObjectId.isValid(id)) {
            throw new Error("Object Id is invalid")
        }
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: "update_section" },
                { id, data }
            )
        )
    }

    @Delete('section/delete-section/:id')
    async deleteSection(@Param('id') id: string) {
        return await lastValueFrom(
            this.survey_client.send(
                { cmd: "delete_section" },
                id
            )
        )
    }
}
