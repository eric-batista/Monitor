import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MailListService } from './mail-list.service';

@Processor('emails')
export class SendMailTweetsJob {
  private readonly logger = new Logger(SendMailTweetsJob.name);
  constructor(private mailListService: MailListService) {}

  @Process()
  async handle(job: Job) {
    const mailList = await this.mailListService.findOne();
    this.logger.log(`emails: ${mailList.Emails}`);
    this.logger.log('conexão com a kafka para disparo de e-mails');
  }
}
