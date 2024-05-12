import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schemas';
import { Model, ObjectIdSchemaDefinition } from 'mongoose';
import { Conversation } from 'src/conversation/schemas/conversation.schema';
import { appendFile } from 'fs';
import { Group } from 'src/group/schemas/group.schema';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { Equals } from 'class-validator';

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
  async createMessageInGroup(createMessageDto: CreateMessageDto,groupDto: CreateGroupDto,quantity: number) {
    try {
      console.log("createMessageInGroup")
      const message = await this.messageModel.create(createMessageDto);
      // return message;

      let conversation = await this.conversationModel.findOne()
    } catch (error) {
      console.log("er")
    }
  }

  async joinGroup(GroupDto: CreateGroupDto,userId : ObjectIdSchemaDefinition){
    try {
      let group = await this.groupModel.findOne({ groupName: GroupDto.groupName });
  
      if (!group) {
        return "Group is not found";
      }
      const mongoose = require('mongoose');
      // Đảm bảo userId là một ObjectId mới
      const objectId = new mongoose.Types.ObjectId(userId);
  
      // Kiểm tra xem người dùng đã là thành viên chưa
      const isMember = group.members.some(member => Equals(member,objectId));
      if (isMember) {
        return "You are already in this group";
      } else {
        // Thêm thành viên mới vào nhóm
        group.members.push(objectId);
        await group.save(); // Lưu thay đổi vào cơ sở dữ liệu
        console.log("New member added:", objectId, "to group:", group.groupName);
        return "New member added successfully";
      }
    } catch (error) {
      console.log("Error in JoinGroup", error);
      return error.message;
    }
  
}  

}











