
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({required: true,type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  senderId : string;

  @Prop({required: true,type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receiverId : string;

  @Prop()
  message : string;

  @Prop({default: Date.now})
  createdAt : Date;
  
  @Prop({default: Date.now})
  updatedAt : Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);