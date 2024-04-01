
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Message } from 'src/messages/schemas/message.schemas';
export type ConversationDocument = HydratedDocument<Conversation>;

@Schema()
export class Conversation {
  @Prop({required: true,type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  participants : string;

  @Prop({required: true,type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  messageIds: Message[];


  @Prop({default: Date.now})
  createdAt : Date;
  
  @Prop({default: Date.now})
  updatedAt : Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);