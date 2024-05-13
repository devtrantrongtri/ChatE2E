import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { ObjectIdSchemaDefinition } from 'mongoose';


@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiTags('messages')
  @UseGuards(AuthenticatedGuard)
  @Post(':id')
  sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Param('id') receiverID: string,
    @Req() req,
  ) {
    const senderID = req.user.userId; 
    // Thêm senderID và receiverID vào createMessageDto
    createMessageDto.senderId = senderID;
    createMessageDto.receiverId = receiverID;
    return this.messagesService.createMessage(createMessageDto);
  }
  @ApiTags('messages')
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getMessages(
    @Param('id') receiverID: string,
    @Req() req){

       const senderID = req.user.userId; 
       return this.messagesService.getMessages(senderID, receiverID);
    }
  
    @ApiTags('messages')
    @UseGuards(AuthenticatedGuard)
    @Post('group/:name')
    createMessageInGroup(
      @Body() createMessageDto : CreateMessageDto,
      @Param('name') groupName: string
    ){
      return this.messagesService.createMessageInGroup(createMessageDto,groupName);
    }

    @ApiTags('Group')
    @UseGuards(AuthenticatedGuard)
    @Post('joinGroup/:name')
    joinGroup(
      @Body() createGroupDto: CreateGroupDto,
      @Param('name') userId: ObjectIdSchemaDefinition
    
    ) {
      return this.messagesService.joinGroup(createGroupDto,userId)
    }

    @ApiTags('messages/Group')
    @UseGuards(AuthenticatedGuard)
    @Get('/group/:group')
    getMessagesInGroup(
      @Param('group') groupName: string,
      @Req() req){

         return this.messagesService.getMessagesInGroup(groupName);
      }
}
