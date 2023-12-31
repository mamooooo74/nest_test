import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}
  private items: Item[] = [];
  async findAll() {
    return await this.itemRepository.find();
  }

  async findById(id: string) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  async create(creatteItemDto: CreateItemDto, user: User) {
    const { name, price, description } = creatteItemDto;
    const item = this.itemRepository.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
    });
    await this.itemRepository.save(item);
    return item;
  }

  async updateStatus(id: string, user: User) {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    const updatedItem = await this.itemRepository.update(id, {
      status: item.status,
      updatedAt: item.updatedAt,
    });
    if (updatedItem.affected === 0) {
      throw new NotFoundException(`${id}のデータを更新できませんでした`);
    }
    return item;
  }

  async deleteById(id: string, user: User) {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません');
    }
    const response = await this.itemRepository.delete({ id });

    if (response.affected !== 1) {
      throw new NotFoundException(`${id}のデータを削除できませんでした`);
    }
    return;
  }
}
