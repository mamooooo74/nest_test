import { Injectable } from '@nestjs/common';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  findAll() {
    return this.items;
  }

  findById(id: string) {
    const item = this.items.find((item) => item.id === id);
    return item;
  }

  create(item: Item) {
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
