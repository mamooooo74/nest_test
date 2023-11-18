import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  findAll() {
    return this.items;
  }

  findById(id: string) {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  create(creatteItemDto: CreateItemDto) {
    const item: Item = {
      id: uuid(),
      ...creatteItemDto,
      status: ItemStatus.ON_SALE,
    };
    this.items.push(item);
    return item;
  }

  updateStatus(id: string) {
    const item = this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  deleteById(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
    return;
  }
}
