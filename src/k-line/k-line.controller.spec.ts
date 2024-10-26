import { Test, TestingModule } from '@nestjs/testing';
import { KLineController } from './k-line.controller';

describe('KLineController', () => {
  let controller: KLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KLineController],
    }).compile();

    controller = module.get<KLineController>(KLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
