import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { CacheModule, Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckNewTweetsTask } from './check-new-tweets/check-new-tweets.task';

@Module({
  imports: [
    CacheModule.register({}),
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
  ],
  controllers: [TweetsController],
  providers: [TweetsService, CheckNewTweetsTask],
})
export class TweetsModule {}
