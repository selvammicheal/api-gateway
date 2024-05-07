import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy
  ) { }

  createSurvey(data) {
    const value=  this.survey_client.send(
      { cmd: 'create_survey' },
      {data},
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

  getSurvey(id) {
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

  getQuestionsBySection(id) {
    console.log(id)
    return this.survey_client.send(
      { cmd: 'get_questions_by_section' },
      id,
    );
  }

  createQuestion(data) {
    console.log(data,"sdkfjn");
    return this.survey_client.send(
      { cmd: 'create_question' }, 
      data,
    );
  }
}
