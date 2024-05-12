
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type ConversationDocument = HydratedDocument<Conversation>;

@Schema()
export class Conversation {

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  participants;
 
  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], default: [] })
  messageIds;
 
  @Prop({type:String, default: null })
  groupName: string;

  @Prop({default: Date.now})
  createdAt : Date;
  
  @Prop({default: Date.now})
  updatedAt : Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
