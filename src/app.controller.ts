import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { updateSurveyDto } from './dto/survey/update-survey.dto';
import { createSurveyDto } from './dto/survey/create-survey.dto';
import { updateQuestionDto } from './dto/question/update-question.dto';

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

  @Post('question/create-question')
  createQuestion(@Body() questionData) {
    return this.appService.createQuestion(questionData);
  }

  @Get("question/get-all-questions/:id")
  getQuestionsBySection(@Param("id") id: string,) {
    return this.appService.getQuestionsBySection(id); 
  }

  @Patch("question/update-question/:id")
  updateQuestion(@Param("id") id: string, @Body() data: updateQuestionDto) {
    return this.appService.updateQuestion(id, data);
  }

  @Post('question-type/create-question-type')
  createQuestionType(@Body() questionTypeData) {
    return this.appService.createQuestionType(questionTypeData);
  }

  @Get("question-type/get-all-question-type")
  getAllQuestionType() {
    return this.appService.getAllQuestionType(); 
  }

  @Post('section/create-section')
  createSection(@Body() sectionData) {
    return this.appService.createSection(sectionData);
  }

  @Get("section/get-all-sections")
  getAllSections() {
    console.log("trigger")
    return this.appService.getAllSections(); 
  }
}
