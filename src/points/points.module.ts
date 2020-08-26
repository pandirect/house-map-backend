import { Module } from '@nestjs/common';
import { PointsService, SpecializationsService, TypesService } from './services';
import { PointsController } from './points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point, TypePoint, Specialization } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypePoint, Specialization, Point])],
  controllers: [PointsController],
  providers: [PointsService, SpecializationsService, TypesService],
})
export class PointsModule {}
