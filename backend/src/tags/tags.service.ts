import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { logger } from '../utils/logger';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto, userId: string) {
    const tag = await this.prisma.tag.create({
      data: {
        ...createTagDto,
        userId,
      },
    });
    logger.info(`Created new tag: ${tag.id} for user: ${userId}`);
    return tag;
  }

  async findAll(userId: string) {
    return this.prisma.tag.findMany({ where: { userId } });
  }

  async remove(id: string, userId: string) {
    const tag = await this.prisma.tag.deleteMany({
      where: { id, userId },
    });
    if (tag.count === 0) {
      logger.warn(`Failed to delete tag: ${id} for user: ${userId}`);
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    logger.info(`Deleted tag: ${id} for user: ${userId}`);
    return { id };
  }
}