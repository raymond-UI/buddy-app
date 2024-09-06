import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePomodoroDto } from './dto/create-pomodoro.dto';
import { logger } from '../utils/logger';

@Controller('pomodoro')
@UseGuards(JwtAuthGuard)
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Post()
  create(@Body() createPomodoroDto: CreatePomodoroDto, @Request() req) {
    logger.info(`Creating pomodoro session for user: ${req.user.userId}`);
    return this.pomodoroService.create(createPomodoroDto, req.user.userId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    logger.info(`Fetching all pomodoro sessions for user: ${userId}`);
    return this.pomodoroService.findAll(userId);
  }
}