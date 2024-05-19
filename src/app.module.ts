import { Module } from '@nestjs/common';
import { SectionController } from './controllers/section.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SurveyController } from './controllers/survey.controller';
import { QuestionController } from './controllers/question.controller';
import { QuestionTypeController } from './controllers/question-type.controller';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './error-handling';
import { SurveyResponseController } from './controllers/survey-response.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SURVEY_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      }
    ]),
  ],
  controllers: [SurveyController, QuestionController, QuestionTypeController, SectionController, SurveyResponseController],
  providers: [{
    provide: APP_FILTER,
    useClass: CustomExceptionFilter,
  }],
})
export class AppModule {}
