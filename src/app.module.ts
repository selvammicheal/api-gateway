import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SurveyController } from './survey.controller';
import { QuestionController } from './question.controller';
import { QuestionTypeController } from './question-type.controller';

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
  controllers: [SurveyController, QuestionController, QuestionTypeController, SectionController],
  providers: [],
})
export class AppModule {}
