
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, unique: true})
  username: string;
  @Prop({default: null})
  groupList:string[];

  @Prop({ type: Buffer }) // Sử dụng kiểu dữ liệu Buffer cho trường pubKey
  pubKey: Buffer;

  @Prop()
  email: string;

  @Prop({required: true})
  password : string;
  
  @Prop({default: Date.now})
  createdAt : Date;
  
  @Prop({default: Date.now})
  updatedAt : Date;
}

export const UserSchema = SchemaFactory.createForClass(User);