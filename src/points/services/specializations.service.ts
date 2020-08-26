import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialization } from '../entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectRepository(Specialization)
    private readonly specializationRepository: Repository<Specialization>,
  ) {}

  async findAll(): Promise<Specialization[]> {
    return this.specializationRepository.find();
  }
}
