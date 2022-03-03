import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folders } from 'src/folders/folders.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from '../dto/create-item.dto';
import { Items } from '../items.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items) private itemRepo: Repository<Items>,
    @InjectRepository(Folders) private folderRepo: Repository<Folders>,
  ) {}

  async create(id: number, body: CreateItemDto) {
    const allreadyCreated = await this.itemRepo
      .find({
        where: { description: body.description },
        relations: ['folders'],
      })
      .catch((err) => console.log(err));
    if (allreadyCreated) {
      const folderItem = allreadyCreated?.find((e) => e.folders.id == id);
      if (folderItem) return { message: 'This item already exist' };
    }
    const folder = await this.folderRepo.findOne(id);
    const newItem = new Items();
    newItem.folders = folder;
    newItem.description = body.description;
    newItem.status = body.status;
    const data = await this.itemRepo.save(newItem);
    return {
      message: `the item ${body.description} has been created successfully`,
      data: data,
    };
  }

  async find(id: number) {
    const allItems = await this.itemRepo
      .find({ relations: ['folders'] })
      .catch((err) => console.log(err));
    if (allItems) {
      const folderItems = allItems?.filter((e) => e.folders.id == id);
      return folderItems;
    }
  }

  async delete(id: number) {
    const itemDeleted = await this.itemRepo.delete(id);
    if (itemDeleted)
      return { message: `The Item ${id} was deleted successfully` };
    else return { message: "This Folder doesn't exist" };
  }

  async update(id: number, body: CreateItemDto) {
    const item = await this.itemRepo.findOne(id);
    this.itemRepo.merge(item, body);
    this.itemRepo.save(item);
    return {
      success: true,
      message: `The item ${id} was updated successfully with status: ${body.status} and description: ${body.description}`,
    };
  }
}
