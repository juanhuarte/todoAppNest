import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFolderDto } from '../dto/create-folder.dto';
import { Folders } from '../folders.entity';
import { Users } from 'src/users/users.entity';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folders) private folderRepo: Repository<Folders>,
    @InjectRepository(Users) private userRepo: Repository<Users>,
  ) {}

  async create(id: number, body: CreateFolderDto) {
    const allreadyCreated = await this.folderRepo
      .find({
        where: { name: body.name },
        relations: ['users'],
      })
      .catch((err) => console.log(err));
    if (allreadyCreated) {
      const userFolder = allreadyCreated?.find((e) => e.users.id == id);
      if (userFolder) return { message: 'This folder already exist' };
    }
    const user = await this.userRepo.findOne(id);
    const newFolder = new Folders();
    newFolder.users = user;
    newFolder.name = body.name;
    const data = await this.folderRepo.save(newFolder);
    return {
      success: `the folder ${body.name} has been created successfully`,
      data: data,
    };
  }

  async find(id: number) {
    const allFolders = await this.folderRepo
      .find({ relations: ['users'] })
      .catch((err) => console.log(err));
    if (allFolders) {
      const usersFolders = allFolders?.filter((e) => e.users.id == id);
      return usersFolders;
    }
  }

  async delete(id: number) {
    const folderDeleted = await this.folderRepo.delete(id);
    if (folderDeleted)
      return { message: `The Folder ${id} was deleted successfully` };
    else return { message: "This Folder doesn't exist" };
  }

  async update(id: number, body: CreateFolderDto) {
    const folder = await this.folderRepo.findOne(id);
    this.folderRepo.merge(folder, body);
    return this.folderRepo.save(folder);
  }
}
