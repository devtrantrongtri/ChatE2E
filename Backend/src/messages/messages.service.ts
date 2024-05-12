import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schemas';
import { Model, ObjectId, ObjectIdSchemaDefinition } from 'mongoose';
import { Conversation } from 'src/conversation/schemas/conversation.schema';
import { appendFile } from 'fs';
import { Group } from 'src/group/schemas/group.schema';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { Equals } from 'class-validator';
const mongoose = require('mongoose');
// import mongoose from 'mongoose';
// // const { ObjectId } = mongoose.Types;

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
  async createMessageInGroup(createMessageDto: CreateMessageDto,groupName) {
    console.log(groupName);
    try {
      console.log("createMessageInGroup")
      const message = await this.messageModel.create(createMessageDto);
      console.log("groupName", groupName)

      // return message;
      let group = await this.groupModel.findOne({
        groupName: groupName,
      })
      if(!group){
        return "Group is not found";
      }
      let conversation = await this.conversationModel.findOne({
        
        // kiểm tra xem có thuộc member mới nhất không, dựa vào groupName và members.
        participants: { $all: group.members },
        
        groupName: groupName
      })

      if(!conversation){
        console.log("conversation is not found")
        conversation = await this.conversationModel.create({
          participants: group.members,
          groupName: groupName
        })
      }

      conversation.messageIds.push(message.id);
      await conversation.save();
      const isHaveConversation = group.groupConversation.map(conversation => conversation.toString()).includes(conversation.id);
      if(!isHaveConversation){
          const conversation_id = new mongoose.Types.ObjectId(conversation.id);
          // thêm vào Group
          group.groupConversation.push(conversation_id);
        }
        
      await group.save();
      return {
        message,
        messages: createMessageDto.message,
        group,
        msg: 'created message',
      };

    } catch (error) {
      console.log("er tại lúc tạo mes in Group")
      console.log(error)
    }
  }

  async joinGroup(GroupDto: CreateGroupDto,userId : ObjectIdSchemaDefinition){
    try {
      let group = await this.groupModel.findOne({ groupName: GroupDto.groupName });
  
      if (!group) {
        return "Group is not found";
      }
      // Đảm bảo userId là một ObjectId mới
      const objectId = new mongoose.Types.ObjectId(userId);
      const userIdString = objectId.toString();
      
      // Kiểm tra xem người dùng đã là thành viên chưa
      const isMember = group.members.map(member => member.toString()).includes(userIdString);
      if (isMember) {
        console.log("userID:",userId)
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











