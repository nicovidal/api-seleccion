import { Test, TestingModule } from '@nestjs/testing';
import { ObtencionDataController } from './obtencion-data.controller';
import { ObtencionDataService } from './obtencion-data.service';

describe('ObtencionDataController', () => {
  let controller: ObtencionDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObtencionDataController],
      providers: [ObtencionDataService],
    }).compile();

    controller = module.get<ObtencionDataController>(ObtencionDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
