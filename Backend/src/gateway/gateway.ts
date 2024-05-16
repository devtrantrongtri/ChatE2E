import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

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

  constructor() {
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


      // // tạo cổng nhận tin nhắn group,
      // socket.on('groupMessageSentSignal', (groupName: string) => {
      //   socket.to(groupName).emit('updateMessageSignal');
      // });

      socket.on('groupMessage', (data : any) => {
        console.log(data)
        // socket.to(data.groupName).emit('groupMessageSent',data);
        this.server.to(data.groupName).emit('groupMessageSent', data);
      })

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

