import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message, MessageSchema } from './schemas/message.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from 'src/conversation/schemas/conversation.schema';
import { Group, GroupSchema } from 'src/group/schemas/group.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
    MongooseModule.forFeature([{name:Group.name, schema:GroupSchema}]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService]
})
export class MessagesModule {}
