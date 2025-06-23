import { Test, TestingModule } from '@nestjs/testing';
import { CustomLabelsService } from './custom-labels.service';

describe('CustomLabelsService', () => {
  let service: CustomLabelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomLabelsService],
    }).compile();

    service = module.get<CustomLabelsService>(CustomLabelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
