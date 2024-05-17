import { OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Model } from "mongoose";
import { Server } from "socket.io";
import { Conversation } from "src/conversation/schemas/conversation.schema";
import { Group } from "src/group/schemas/group.schema";
import { CreateMessageDto } from "src/messages/dto/create-message.dto";
import { MessagesService } from "src/messages/messages.service";
import { Message } from "src/messages/schemas/message.schemas";
import { User } from "src/users/schemas/user.schema";

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
export class MyGateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  // Map để lưu trữ ID của người dùng và ID của socket tương ứng
  userSocketMap: { [userId: string]: string } = {};

  constructor(
    // @InjectModel(Message.name) 
    // private messageModel: Model<Message>,
    // @InjectModel(Conversation.name)
    // private conversationModel: Model<Conversation>,
    // @InjectModel(Group.name)
    // private groupModel: Model<Group>,
    // @InjectModel(User.name) private userModel: Model<User>
    private readonly messagesService: MessagesService
  ) {
    
    // Ràng buộc ngữ cảnh của phương thức getReceiverSocketId
    this.getReceiverSocketId = this.getReceiverSocketId.bind(this);
  }
// Phương thức để lấy ID của socket của người dùng nhận
  private getReceiverSocketId(receiverId: string): string | undefined {
    return this.userSocketMap[receiverId];
  }
 // Phương thức được thực thi sau khi module đã được khởi tạo
  onModuleInit() {
    this.server.on('connection', (socket) => {

        // Lấy ID của người dùng từ handshake query
      let userId: string | undefined = Array.isArray(
        socket.handshake.query.userId,
      )
        ? socket.handshake.query.userId[0]
        : (socket.handshake.query.userId as string);
         // Nếu có ID của người dùng, ánh xạ nó với ID của socket
      if (userId) {
        this.userSocketMap[userId] = socket.id;
        this.server.emit('getOnlineUser', Object.keys(this.userSocketMap));
      }
      console.log(userId, "socketId:",socket.id)
      socket.on('disconnect', () => {
        // Remove the user from the map
        console.log(userId,"disconnectd")
        Object.keys(this.userSocketMap).forEach((key) => {
          if (this.userSocketMap[key] === socket.id) {
            delete this.userSocketMap[key];
          }
        });
        // Phát ra một sự kiện để thông báo cho các client về người dùng đang trực tuyến
        this.server.emit('getOnlineUser', Object.keys(this.userSocketMap));
      });
        // Bắt sự kiện khi có tín hiệu tin nhắn được gửi
      socket.on('messageSentSignal', () => {
        
        socket.broadcast.emit('updateMessageSignal');
      });



      socket.on('groupMessage',async (data : any) => {
        /* data 
        {
          receiverId: '664776414c3969b77705dd9e', 
          senderId: '66424c7d8009f28a09a69445',   
          message: 'chào brd',
          groupName: 'KTX',
          success: true
        }
        */
        console.log(data)

        const messageDto = {
          groupName: data.groupName,
          message: data.message,
          receiverId: data.receiverId,
          senderId: data.senderId,
      } as CreateMessageDto;

        const participants = await this.messagesService.createMessageInGroup(messageDto,data.groupName);
        console.log("Message in server : ",participants)
        const updatedData = {
          ...data,
          participants
      };

        // socket.to(data.groupName).emit('groupMessageSent',data);
        this.server.to(data.groupName).emit('groupMessageSent', updatedData);
      })
      // khi click vào group ở sideBar, sẽ được vào group.
      socket.on('groupSocketConnected', (groupName : string) => {
        console.log("Joined ",groupName)
        socket.join(groupName);
        
      })
    });
  }
}


    
    // @SubscribeMessage('messageSentSignal')
    // onMessageSentSignal() {
    //     // Send an update message signal to indicate that a message has been sent
    //     this.server.emit('updateMessageSignal');
    // }
    
    // @SubscribeMessage('newMessage')
    // onNewMessage(@MessageBody() body: any) {
    //     this.server.emit('updateMessage', {
    //         msg: 'newMessage',
    //     });
    // }



// import { HttpException, HttpStatus, Logger, UseGuards } from "@nestjs/common";
// import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
// import { Server } from "http";
// import { AuthService } from "src/auth/auth.service";
// import { AuthenticatedGuard } from "src/auth/authenticated.guard";
// import { UsersService } from "src/users/users.service";


// @UseGuards(AuthenticatedGuard)
// @WebSocketGateway(3006, { cors: true })
// export class AppGateway
//   implements
//   OnGatewayInit,
//   OnGatewayConnection,
//   OnGatewayDisconnect
// {
//   @WebSocketServer() server: Server;
//   private logger: Logger = new Logger('MessageGateway');
//   constructor(
//     private userService: UsersService,
//     private readonly authService: AuthService,
//   ) {}
  
//   //function get user 
// //   async getDataUserFromToken(client: Socket): Promise<UserEntity> {
// //     const authToken: any = client.handshake?.query?.token;
// //     try {
// //       const decoded = this.authService.verify(authToken);

// //       return await this.userService.getUserByEmail(decoded.email); // response to function
// //     } catch (ex) {
// //       throw new HttpException('Not found', HttpStatus.NOT_FOUND);
// //     }
// //   }
// }

