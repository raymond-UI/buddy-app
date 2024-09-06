import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePomodoroDto } from './dto/create-pomodoro.dto';
import { logger } from '../utils/logger';

@Injectable()
export class PomodoroService {
  constructor(private prisma: PrismaService) {}

  async create(createPomodoroDto: CreatePomodoroDto, userId: string) {
    const pomodoroSession = await this.prisma.pomodoroSession.create({
      data: {
        ...createPomodoroDto,
        userId,
      },
    });
    logger.info(`Created new pomodoro session for user: ${userId}`);
    return pomodoroSession;
  }

  async findAll(userId: string) {
    return this.prisma.pomodoroSession.findMany({ where: { userId } });
  }
}