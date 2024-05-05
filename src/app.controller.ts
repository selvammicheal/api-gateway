import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { createSurveyDto } from './dto/createSurveyDto.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('survey/createSurvey')
  createSurvey(@Body(ValidationPipe) surveyData: createSurveyDto) {
    return this.appService.createSurvey(surveyData);
  }

  @Get("/survey")
  getSurvey() {
    return this.appService.getSurvey();
  }
}
