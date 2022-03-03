import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

import { Users } from '../users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>, // private jwtService: JwtService,
  ) {}

  async create(body: CreateUserDto) {
    const encryptedPassword = bcrypt.hashSync(body.password, 10);

    const allreadyExistUser = await this.usersRepo
      .findOne({ where: { mail: body.mail } })
      .catch((err) => console.log(err));
    console.log('allready', allreadyExistUser);
    if (allreadyExistUser)
      return { message: 'Already Exist an User with that email' };
    const newUser = this.usersRepo.create({
      name: body.name.toLowerCase(),
      lastName: body.lastName,
      mail: body.mail,
      password: encryptedPassword,
    });
    return this.usersRepo.save(newUser);
  }

  async findOne(body: FindUserDto) {
    const findUser = await this.usersRepo
      .findOne({ where: { mail: body.mail } })
      .catch((err) => console.log(err));
    if (!findUser) return { message: 'Incorrect data' };
    else {
      console.log(findUser);
      if (bcrypt.compareSync(body.password, findUser.password)) {
        // const jwtToken = this.jwtService.sign({
        //   id: findUser.id,
        //   mail: findUser.mail,
        // });
        console.log(findUser);
        return { user: findUser };
      }
      return { message: 'Incorrect data' };
    }
  }

  async delete(id: number) {
    const userDeleted = await this.usersRepo.delete(id);
    if (userDeleted)
      return { message: `The User ${id} was deleted successfully` };
    else return { message: "This User doesn't exist" };
  }
}
