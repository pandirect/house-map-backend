import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypePoint } from '../entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(TypePoint)
    private readonly typesRepository: Repository<TypePoint>,
  ) {}

  async findAll(): Promise<TypePoint[]> {
    return this.typesRepository.find();
  }
}
