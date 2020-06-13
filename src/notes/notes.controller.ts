import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param, ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { NoteDto } from './dto';
import { NotesService } from './notes.service';
import { INote } from './interfaces';
import { HttpExceptionFilter } from '../_common/filters';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  async findAll(): Promise<INote[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<INote> {
    return this.notesService.find(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: NoteDto) {
    await this.notesService.create(dto);
  }

  @Put(':id')
  @UseFilters(new HttpExceptionFilter())
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: NoteDto) {
    await this.notesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.notesService.remove(id)
  }
}
