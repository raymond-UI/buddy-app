// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    logger.info('Database connection established');

    this.$on('query' as any, (e: { query: string; params: any; duration: number }) => {
      logger.info('Query: ' + e.query);
      logger.info('Params: ' + e.params);
      logger.info('Duration: ' + e.duration + 'ms');
    });
    
  }

  async onModuleDestroy() {
    await this.$disconnect();
    logger.info('Database connection closed');
  }
}
