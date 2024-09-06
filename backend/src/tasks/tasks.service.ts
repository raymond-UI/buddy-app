/ src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { logger } from '../utils/logger';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const task = await this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
    logger.info(`Created new task: ${task.id} for user: ${userId}`);
    return task;
  }

  async findAll(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) {
      logger.warn(`Task not found: ${id} for user: ${userId}`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const task = await this.prisma.task.updateMany({
      where: { id, userId },
      data: updateTaskDto,
    });
    if (task.count === 0) {
      logger.warn(`Failed to update task: ${id} for user: ${userId}`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    logger.info(`Updated task: ${id} for user: ${userId}`);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string) {
    const task = await this.prisma.task.deleteMany({
      where: { id, userId },
    });
    if (task.count === 0) {
      logger.warn(`Failed to delete task: ${id} for user: ${userId}`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    logger.info(`Deleted task: ${id} for user: ${userId}`);
    return { id };
  }
}