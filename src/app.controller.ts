import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { createSurveyDto } from './dto/create-survey.dto';
import { updateSurveyDto } from './dto/update-survey.dto';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('survey/create-survey')
  createSurvey(@Body(ValidationPipe) surveyData: createSurveyDto) {
    return this.appService.createSurvey(surveyData);
  }

  @Get("survey")
  getSurvey() {
    return this.appService.getSurvey();
  }

  @Patch("survey/:id")
  updateSurvey(@Param("id") id: string, @Body() data: updateSurveyDto) {
    return this.appService.updateSurvey(id, data);
  }

  @Get("question")
  getQuestion() {
    return this.appService.getSurvey();
  }

  @Post('survey/createSurvey')
  createQuestion(@Body(ValidationPipe) surveyData: createSurveyDto) {
    return this.appService.createSurvey(surveyData);
  }
}
