import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/getInForUser/:id')
  findDetail(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }

  // create a new user
  @ApiTags('auth')
  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
 
    return this.usersService.createUser(createUserDto);
    
  }
  @ApiTags('auth')
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    try {
      return { 
        user : {
          userId : req.user.userId,
          username : req.user.username,
        },
        msg: 'User logged in' 
      };
    } catch (error) {
      return {
        error: error,
        msg:"something went wrong"
      }
    }
  }
 
  // @UseGuards(AuthenticatedGuard)
  // @Get('/')
  // getHello(@Request() req): string {
  //   return req.user;
  // }
  //Get / logout
  @ApiTags('auth')
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' }
  }

  // xac thuc user
  @ApiTags('auth')
  @UseGuards(AuthenticatedGuard)
  @Get('/authen')
  authenticate(@Request() req): any {
    try {
      return { 
        user : req.user,
        msg: 'User logged in' ,
        hashPassword: req.user.password
      };
    } catch (error) {
      return {
        error: error,
        msg:"something went wrong"
      }
    }
  }
  @ApiTags('user')
  @UseGuards(AuthenticatedGuard)
  @Get()
  findAllUser() {
    return this.usersService.findAll();
  }
  @ApiTags('user')
  @UseGuards(AuthenticatedGuard)
  @Get('/:id')
  findAllUserNoIts(@Param('id') id:string) {
    return this.usersService.findAllNoIts(id);
  }

  @ApiTags('user')
  @UseGuards(AuthenticatedGuard)
  @Get('group/:id')
  getAllGroupOfUser(@Param('id') id:string) {
    return this.usersService.getAllGroupOfUser(id);
  }
}
