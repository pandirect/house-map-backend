import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { HttpExceptionFilter } from '../_common/filters';
import { NotFoundInterceptor } from '../_common/interceptors';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SpecializationsService, TypesService, PointsService } from './services';
import { Point, Specialization, TypePoint } from './entity';

@ApiTags('points')
@Controller('points')
@UseInterceptors(new NotFoundInterceptor('Not found item for given id'))
export class PointsController {
  constructor(
    private pointsService: PointsService,
    private typesService: TypesService,
    private specializationsService: SpecializationsService
  ) {}

  @Get('/types')
  @ApiOkResponse({ type: TypePoint, isArray: true })
  async getTypes(): Promise<TypePoint[]> {
    return this.typesService.findAll();
  }

  @Get('/specializations')
  @ApiOkResponse({ type: Specialization, isArray: true })
  async getSpecializations(): Promise<Specialization[]> {
    return this.specializationsService.findAll();
  }

  @Get()
  @ApiOkResponse({ type: Point, isArray: true })
  async getPoints(): Promise<Point[]> {
    return this.pointsService.findAll();
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: Point })
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createPoint(@Body() dto: object): Promise<Point> {
    return this.pointsService.create(dto);
  }

  @Put(':id')
  @UseFilters(new HttpExceptionFilter())
  @ApiOkResponse({ type: Point })
  @ApiNotFoundResponse()
  // eslint-disable-next-line @typescript-eslint/ban-types
  async updatePoint(@Param('id', ParseIntPipe) id: number, @Body() dto: object): Promise<Point> {
    await this.pointsService.update(id, dto as Point);

    return this.pointsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.pointsService.remove(id);

    return result.affected ? { message: 'Point was removed' } : null;
  }
}
