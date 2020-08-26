import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from '../entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private readonly pointsRepository: Repository<Point>,
  ) {}

  async findAll(): Promise<Point[]> {
    return this.pointsRepository.find();
  }

  async findOne(id: number): Promise<Point> {
    return this.pointsRepository.findOne({ where: { id } });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async create(dto: object): Promise<Point> {
    const note = Point.createFromObject(dto);

    return this.pointsRepository.save(note);
  }

  async update(id: number, dto: Point): Promise<UpdateResult> {
    return this.pointsRepository.update(id, dto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.pointsRepository.delete(id);
  }
}
