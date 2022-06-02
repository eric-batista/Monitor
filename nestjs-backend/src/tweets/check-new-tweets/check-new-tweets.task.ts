import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TweetsService } from '../tweets.service';

@Injectable()
export class CheckNewTweetsTask {
  private readonly logger = new Logger(CheckNewTweetsTask.name);
  private limit = 10;

  constructor(private tweetService: TweetsService) {}

  @Interval(5000)
  async handle() {
    this.logger.log('Procurando tweets...');
  }
}
