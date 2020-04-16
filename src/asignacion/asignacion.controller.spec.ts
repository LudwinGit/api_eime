import { Test, TestingModule } from '@nestjs/testing';
import { AsignacionController } from './asignacion.controller';

describe('Asignacion Controller', () => {
  let controller: AsignacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsignacionController],
    }).compile();

    controller = module.get<AsignacionController>(AsignacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
