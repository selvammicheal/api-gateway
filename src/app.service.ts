import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ObjectId } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy
  ) { }

  createSurvey(data) {
    const value=  this.survey_client.send(
      { cmd: 'create_survey' },
      data,
    );
    console.log(value)
    return value
  }

  getAllSurvey() {
    return this.survey_client.send(
      { cmd: 'get_all_survey' },
      {},
    );
  }

  getSurvey(id: ObjectId) {
    return this.survey_client.send(
      { cmd: 'get_survey' },
      id,
    );
  }

  updateSurvey(id: string, data) {
    return this.survey_client.send(
      { cmd: "update_survey" },
      { id, data }
    )
  }

  createQuestion(data) {
    return this.survey_client.send(
      { cmd: 'create_question' }, 
      data,
    );
  }

  getQuestionsBySurvey(id) {
    console.log(id)
    return this.survey_client.send(
      { cmd: 'get_questions_by_survey' },
      id,
    );
  }

  updateQuestion(id: string, data) {
    console.log(id,data)
    return this.survey_client.send(
      { cmd: "update_question" },
      { id, data }
    )
  }

  createQuestionType(data) {
    return this.survey_client.send(
      { cmd: 'create_question_type' }, 
      data,
    );
  }

  getAllQuestionType() {
    return this.survey_client.send(
      { cmd: 'get_all_question_type' },
      {},
    );
  }

  createSection(data) {
    return this.survey_client.send(
      { cmd: 'create_section' },
      data,
    );
  }

  getAllSections(id) {
    return this.survey_client.send(
      { cmd: 'get_all_sections' },
      id,
    );
  }
}
 