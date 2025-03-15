import { Test, TestingModule } from '@nestjs/testing';
import { SeleccionController } from './seleccion.controller';
import { SeleccionService } from './seleccion.service';

describe('SeleccionController', () => {
  let controller: SeleccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeleccionController],
      providers: [SeleccionService],
    }).compile();

    controller = module.get<SeleccionController>(SeleccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
