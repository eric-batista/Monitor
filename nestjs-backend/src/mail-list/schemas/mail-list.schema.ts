import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MailListDocument = MailList & Document;

@Schema()
export class MailList {
  @Prop(MongooseSchema.Types.ObjectId)
  Id: string;

  @Prop({ type: [String] })
  Emails: string[];
}

export const MailListSchema = SchemaFactory.createForClass(MailList);
