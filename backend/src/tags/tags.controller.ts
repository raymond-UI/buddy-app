import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { logger } from '../utils/logger';

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto, @Request() req) {
    logger.info(`Creating tag for user: ${req.user.userId}`);
    return this.tagsService.create(createTagDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    logger.info(`Fetching all tags for user: ${req.user.userId}`);
    return this.tagsService.findAll(req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    logger.info(`Deleting tag ${id} for user: ${req.user.userId}`);
    return this.tagsService.remove(id, req.user.userId);
  }
}