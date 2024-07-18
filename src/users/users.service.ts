import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

const SALT_ROUND = 15;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User | boolean | string> {
    let cleanUser = createUserDto;

    const hashedPassword = await bcrypt.hash(cleanUser.password, SALT_ROUND);

    cleanUser = { ...cleanUser, password: hashedPassword };

    const user = await this.usersRepository.save(cleanUser);

    if (!user) {
      throw new BadRequestException('Error al crear el usuario');
    }

    const newUser = this.findByDni(user.dni);

    return newUser;
  }

  findAll() {
    const users = this.usersRepository.find();

    if (!users) {
      throw new NotFoundException('No hay usuarios');
    }

    return users;
  }

  async findOne(id: string): Promise<User | string> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`El #${id} no existe`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.usersRepository.update(id, updateUserDto);

    if (!user) {
      throw new NotFoundException(`El #${id} no existe`);
    }

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByDni(dni: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        dni,
      },
    });

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    return user;
  }
}
