import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationModule } from './conversation/conversation.module';
import { GatewayModule } from './gateway/gateway.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    // config mongoose module
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // configservice for dotenv
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessagesModule,
    ConversationModule,
    GatewayModule,
    GroupModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
