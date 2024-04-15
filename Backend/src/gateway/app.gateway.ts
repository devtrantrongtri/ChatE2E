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

