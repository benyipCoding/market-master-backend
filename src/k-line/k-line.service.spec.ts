import { Test, TestingModule } from '@nestjs/testing';
import { KLineService } from './k-line.service';

describe('KLineService', () => {
  let service: KLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KLineService],
    }).compile();

    service = module.get<KLineService>(KLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
