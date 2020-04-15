import { Test, TestingModule } from '@nestjs/testing';
import { CatedraticoService } from './catedratico.service';

describe('CatedraticoService', () => {
  let service: CatedraticoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatedraticoService],
    }).compile();

    service = module.get<CatedraticoService>(CatedraticoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
