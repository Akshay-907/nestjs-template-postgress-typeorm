import { Test, TestingModule } from '@nestjs/testing';
import { CustomLabelsController } from './custom-labels.controller';
import { CustomLabelsService } from './custom-labels.service';

describe('CustomLabelsController', () => {
  let controller: CustomLabelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomLabelsController],
      providers: [CustomLabelsService],
    }).compile();

    controller = module.get<CustomLabelsController>(CustomLabelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
