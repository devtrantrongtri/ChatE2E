import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './schemas/conversation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConversationService {
  constructor(@InjectModel(Conversation.name) private conversationModel: Model<Conversation>) {}
  // create(createConversationDto: CreateConversationDto) {
  //   return 'This action adds a new conversation';
  // }

  findAll() {
    return this.conversationModel.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} conversation`;
  // }

  // update(id: number, updateConversationDto: UpdateConversationDto) {
  //   return `This action updates a #${id} conversation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} conversation`;
  // }
}
