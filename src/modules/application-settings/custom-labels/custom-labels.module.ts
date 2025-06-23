import { Module } from '@nestjs/common';
import { CustomLabelsService } from './custom-labels.service';
import { CustomLabelsController } from './custom-labels.controller';

@Module({
  controllers: [CustomLabelsController],
  providers: [CustomLabelsService],
})
export class CustomLabelsModule {}
