import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TweetsService } from '../tweets.service';
import { Cache } from 'cache-manager';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class CheckNewTweetsTask {
  private readonly logger = new Logger(CheckNewTweetsTask.name);
  private limit = 10;

  constructor(
    private tweetService: TweetsService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectQueue('emails')
    private emailsQueue: Queue,
  ) {}

  @Interval(5000)
  async handle() {
    this.logger.log('Procurando tweets...');
    let offset = await this.cacheManager.get<number>('tweet-offset');

    offset = offset === undefined || offset === null ? 0 : offset;
    this.logger.log(`offset: ${offset}`);

    const tweets = await this.tweetService.findAll({
      offset,
      limit: this.limit,
    });

    this.logger.log(`tweets count: ${tweets.length}`);

    if (tweets.length === this.limit) {
      this.logger.log('encontrou mais tweets');
      await this.cacheManager.set('tweet-offset', offset + this.limit, {
        ttl: 1 * 60 * 10,
      });

      this.emailsQueue.add({});
    }
  }
}
