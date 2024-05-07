import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { createSurveyDto } from './dto/create-survey.dto';
import { updateSurveyDto } from './dto/update-survey.dto';
import { createQuestionDto } from './dto/question/create-question.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('survey/create-survey')
  createSurvey(@Body() surveyData: createSurveyDto) {
    return this.appService.createSurvey(surveyData);
  }

  @Get("survey/get-all-survey")
  getAllSurvey() {
    return this.appService.getAllSurvey();
  }

  @Get("survey/get-survey/:id")
  getSurvey(@Param("id") id: string) {
    return this.appService.getSurvey(id);
  }

  @Patch("survey/update-survey/:id")
  updateSurvey(@Param("id") id: string, @Body() data: updateSurveyDto) {
    return this.appService.updateSurvey(id, data);
  }

  @Get("question/get-all-questions/:id")
  getQuestionsBySection(@Param("id") id: string,) {
    return this.appService.getQuestionsBySection(id); 
  }

  @Post('question/create-question')
  createQuestion(@Body() questionData) {
    return this.appService.createQuestion(questionData);
  }

  @Post('question-type/create-question-type')
  createQuestionType(@Body() questionTypeData) {
    return this.appService.createQuestionType(questionTypeData);
  }
}
