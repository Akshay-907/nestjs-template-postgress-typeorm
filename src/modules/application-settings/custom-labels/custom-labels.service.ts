import { Injectable } from '@nestjs/common';
import { CreateCustomLabelDto } from './dto/create-custom-label.dto';
import { UpdateCustomLabelDto } from './dto/update-custom-label.dto';

@Injectable()
export class CustomLabelsService {
  create(createCustomLabelDto: CreateCustomLabelDto) {
    return 'This action adds a new customLabel';
  }

  findAll() {
    return `This action returns all customLabels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customLabel`;
  }

  update(id: number, updateCustomLabelDto: UpdateCustomLabelDto) {
    return `This action updates a #${id} customLabel`;
  }

  remove(id: number) {
    return `This action removes a #${id} customLabel`;
  }
}
