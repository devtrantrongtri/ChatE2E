import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schemas';
import { Model } from 'mongoose';
import { Conversation } from 'src/conversation/schemas/conversation.schema';
import { appendFile } from 'fs';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Conversation.name) private conversationModel: Model<Conversation>) {}

  

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    try {
      const message = await this.messageModel.create(createMessageDto);
    let conversation = await this.conversationModel.findOne({
      participants: { $all: [createMessageDto.senderId, createMessageDto.receiverId] },
    });

    if (!conversation) {
      conversation = await this.conversationModel.create({
        participants: [createMessageDto.senderId, createMessageDto.receiverId],
      });
    }

    // Thêm tin nhắn mới vào cuộc trò chuyện
    conversation.messageIds.push(message.id);
    await conversation.save();

    return {
      message,
      messages: createMessageDto.message,
      msg:"created message"
    }
  
    } catch (error) {
      return error
    }
  }
  async getMessages(senderID : string, receiverID : string){
    let conversation = await this.conversationModel.findOne({
      participants: { $all: [senderID, receiverID] },
    }).populate('messageIds'); // direct to conversation.messageIds
    if(!conversation){
      return [];
    }
    const messages = conversation;
    return messages
  }

}
