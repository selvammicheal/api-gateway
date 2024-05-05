import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('SURVEY_MICROSERVICE') private readonly survey_client: ClientProxy
  ) {} 

  createSurvey(data) {
    
    return this.survey_client.send(
      { cmd: 'create_survey' },
      { data },
    );
  }

  getSurvey() {
    return this.survey_client.send(
      { cmd: 'get_survey' },
      {  },
    );
  }
}
