import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schemas';
import { Model } from 'mongoose';
import { Conversation } from 'src/conversation/schemas/conversation.schema';
import { appendFile } from 'fs';
import { Group } from 'src/group/schemas/group.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    @InjectModel(Group.name)
    private groupModel: Model<Group>,
  ) {}

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
      // Tạo tin nhắn mới
      const message = await this.messageModel.create(createMessageDto);

      // Tìm hoặc tạo cuộc trò chuyện dựa trên người gửi và người nhận
      let conversation = await this.conversationModel.findOne({
        participants: {
          $all: [createMessageDto.senderId, createMessageDto.receiverId],
        },
      });

      if (!conversation) {
        conversation = await this.conversationModel.create({
          participants: [
            createMessageDto.senderId,
            createMessageDto.receiverId,
          ],
        });
      }

      // Thêm tin nhắn mới vào cuộc trò chuyện
      conversation.messageIds.push(message.id);
      await conversation.save();

      // Trả về kết quả
      return {
        message,
        messages: createMessageDto.message,
        msg: 'created message',
      };
    } catch (error) {
      // Trả về lỗi nếu có lỗi xảy ra
      return error;
    }
  }

  async getMessages(senderID: string, receiverID: string) {
    // Tìm cuộc trò chuyện dựa trên người gửi và người nhận
    let conversation = await this.conversationModel
      .findOne({
        participants: { $all: [senderID, receiverID] },
      })
      .populate('messageIds'); // Truy vấn và nối các tin nhắn của cuộc trò chuyện

    // Nếu không tìm thấy cuộc trò chuyện, trả về mảng rỗng
    if (!conversation) {
      return [];
    }

    // Trả về các tin nhắn của cuộc trò chuyện
    const messages = conversation;
    return messages;
  }

  // --------- Group -----------
  async createMessageInGroup(createMessageDto: CreateMessageDto) {
    try {
      console.log("createMessageInGroup")
    } catch (error) {
      console.log("er")
    }
  }
}  













