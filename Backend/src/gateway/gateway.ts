import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
})


export class MyGateWay implements OnModuleInit {
    @WebSocketServer()
    server: Server;
    userSocketMap: { [userId: string]: string } = {};

    constructor() {
        this.getReceiverSocketId = this.getReceiverSocketId.bind(this);
    }

    private getReceiverSocketId(receiverId: string): string | undefined {
        return this.userSocketMap[receiverId];
    }

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log("connectedsss");

            let userId: string | undefined = Array.isArray(socket.handshake.query.userId) ? socket.handshake.query.userId[0] : socket.handshake.query.userId as string;
            if (userId) {
                this.userSocketMap[userId] = socket.id;
                this.server.emit("getOnlineUser", Object.keys(this.userSocketMap));
                // console.log("1",this.userSocketMap);
                // console.log("2",Object.keys(this.userSocketMap))
            }
            
            socket.on('disconnect', () => {
                console.log(socket.id);
                console.log("disconnect");

                // Remove the user from the map
                Object.keys(this.userSocketMap).forEach((key) => {
                    if (this.userSocketMap[key] === socket.id) {
                        delete this.userSocketMap[key];
                    }
                });

                this.server.emit("getOnlineUser", Object.keys(this.userSocketMap));
            });

            socket.on('messageSentSignal', () => {

                socket.broadcast.emit('updateMessageSignal');
            });
        });
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
}



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

