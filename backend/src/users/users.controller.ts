import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { logger } from '../utils/logger';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    logger.info(`Registering new user: ${createUserDto.email}`);
    return this.usersService.create(createUserDto);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    logger.info(`Fetching user by email: ${email}`);
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      logger.warn(`User not found: ${email}`);
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}