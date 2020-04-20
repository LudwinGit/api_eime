import { Test, TestingModule } from '@nestjs/testing';
import { CatedraticoController } from './catedratico.controller';

describe('Catedratico Controller', () => {
  let controller: CatedraticoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatedraticoController],
    }).compile();

    controller = module.get<CatedraticoController>(CatedraticoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
