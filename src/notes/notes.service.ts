import { Injectable } from '@nestjs/common';
import { INote } from './interfaces';
import { NoteDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<INote[]> {
    return []
  }

  async find(id: number): Promise<INote> {
    return this.notesRepository.findOne({ where: {id} })
  }

  async create(dto: NoteDto): Promise<void> {
    const note = new Note();
    note.title = dto.title
    note.description = dto.description

    await this.notesRepository.save(note)
  }

  async update(id: number, note: NoteDto): Promise<void> {

  }

  async remove(id: number): Promise<void> {
    await this.notesRepository.delete(id)
  }
}
