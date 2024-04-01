import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  // @Get()
  // findAllUser() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findDetail(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }

  // create a new user
  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
 
      return this.usersService.createUser(createUserDto);
    
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    try {
      return { 
        user : req.user,
        msg: 'User logged in' 
      };
    } catch (error) {
      return {
        error: error,
        msg:"something went wrong"
      }
    }
  }
  // Get / protected
  // @UseGuards(AuthenticatedGuard)
  // @Get('/protected')
  // getHello(@Request() req): string {
  //   return req.user;
  // }
  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' }
  }
}
