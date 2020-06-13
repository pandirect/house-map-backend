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
import { NoteDto } from './dto';
import { NotesService } from './notes.service';
import { INote } from './interfaces';
import { HttpExceptionFilter } from '../_common/filters';
import { NotFoundInterceptor } from '../_common/interceptors';

@Controller('notes')
@UseInterceptors(new NotFoundInterceptor('Not found note for given id'))
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  async findAll(): Promise<INote[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<INote> {
    return this.notesService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: NoteDto): Promise<INote> {
    return this.notesService.create(dto);
  }

  @Put(':id')
  @UseFilters(new HttpExceptionFilter())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: NoteDto,
  ): Promise<INote> {
    await this.notesService.update(id, dto);

    return this.notesService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.notesService.remove(id);

    return result.affected ? { message: 'Note was removed' } : null;
  }
}
