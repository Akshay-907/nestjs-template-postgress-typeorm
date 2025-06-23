import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomLabelDto } from './create-custom-label.dto';

export class UpdateCustomLabelDto extends PartialType(CreateCustomLabelDto) {}
