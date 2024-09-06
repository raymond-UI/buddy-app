import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let appController: AppController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleFixture.get<AppController>(AppController);
  });

  describe('/ (GET)', () => {
    it('should return "Welcome to the Buddy Task Management App!"', () => {
      expect(appController.getHello()).toBe('Welcome to the Buddy Task Management App!');
    });
  });
});