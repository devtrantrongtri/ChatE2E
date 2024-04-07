import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as passport from "passport"
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize())
  app.use(passport.session())

  const config = new DocumentBuilder()
  .setTitle('Chat System')
  .setDescription('API using for chat system')
  .setVersion('1.0')

  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
   // Cấu hình CORS
  app.enableCors({
  origin: 'http://localhost:3000', // Thay đổi địa chỉ nguồn phù hợp
  credentials: true,
  });
  await app.listen(configService.get('PORT'));
}
bootstrap();
