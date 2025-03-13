import { Test, TestingModule } from '@nestjs/testing';
import { ObtencionDataService } from './obtencion-data.service';

describe('ObtencionDataService', () => {
  let service: ObtencionDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObtencionDataService],
    }).compile();

    service = module.get<ObtencionDataService>(ObtencionDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
