import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomLabelsService } from './custom-labels.service';
import { CreateCustomLabelDto } from './dto/create-custom-label.dto';
import { UpdateCustomLabelDto } from './dto/update-custom-label.dto';

@Controller('custom-labels')
export class CustomLabelsController {
  constructor(private readonly customLabelsService: CustomLabelsService) {}

  @Post()
  create(@Body() createCustomLabelDto: CreateCustomLabelDto) {
    return this.customLabelsService.create(createCustomLabelDto);
  }

  @Get()
  findAll() {
    return this.customLabelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customLabelsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomLabelDto: UpdateCustomLabelDto,
  ) {
    return this.customLabelsService.update(+id, updateCustomLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customLabelsService.remove(+id);
  }
}
