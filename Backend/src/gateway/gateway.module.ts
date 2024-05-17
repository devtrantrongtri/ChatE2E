import { Module } from "@nestjs/common";
import { MyGateWay } from "./gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "src/messages/schemas/message.schemas";
import { Conversation, ConversationSchema } from "src/conversation/schemas/conversation.schema";
import { Group, GroupSchema } from "src/group/schemas/group.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { MessagesService } from "src/messages/messages.service";

@Module({
    imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
    MongooseModule.forFeature([{name:Group.name, schema:GroupSchema}]),
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
    ],
    controllers: [],
    providers: [MyGateWay,MessagesService],
    exports: [],
})
export class GatewayModule {

}