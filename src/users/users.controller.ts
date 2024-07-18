import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async findMe(@Request() req) {
    return await this.usersService.findOne(req.user.sub);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async update(@Request() req, @Body() updateUserDto: CreateUserDto) {
    return await this.usersService.update(req.params.id, updateUserDto);
  }
}
