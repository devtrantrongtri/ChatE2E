import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Conversation } from "src/conversation/schemas/conversation.schema";

export type GroupDocument = HydratedDocument<Group>

@Schema()
export class Group {
    @Prop({required: true,unique: true})
    groupName: string;

    @Prop({
        required: true,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: () => Conversation }],
        default: []
    })
    groupConversation : mongoose.Schema.Types.ObjectId[]; // chứa các conversation

    @Prop()
    members : mongoose.Schema.Types.ObjectId[]; // chứa người dùng.

    @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], default: [] })
    messageIds;
    @Prop()
    groupAvatar:string;     
    @Prop()
    groupDescription:string;

    @Prop({default:Date.now})
    createAt : Date

    @Prop({default:Date.now})
    updateAt : Date
}   

export const GroupSchema = SchemaFactory.createForClass(Group);