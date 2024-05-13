
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, unique: true})
  username: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], default: [] })
  groupList: mongoose.Schema.Types.ObjectId[];
  

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