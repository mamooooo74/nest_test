import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemStatus } from './item-status.enum';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.itemService.findById(id);
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ) {
    return this.itemService.create({
      id,
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
    });
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string) {
    return this.itemService.updateStatus(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.itemService.deleteById(id);
  }
}
