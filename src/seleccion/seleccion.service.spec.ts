import { Test, TestingModule } from '@nestjs/testing';
import { SeleccionService } from './seleccion.service';

describe('SeleccionService', () => {
  let service: SeleccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeleccionService],
    }).compile();

    service = module.get<SeleccionService>(SeleccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
