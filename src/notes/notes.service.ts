import { Injectable } from '@nestjs/common';
import { INote } from './interfaces';
import { NoteDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<INote[]> {
    return this.notesRepository.find();
  }

  async findOne(id: number): Promise<INote> {
    return this.notesRepository.findOne({ where: { id } });
  }

  async create(dto: NoteDto): Promise<INote> {
    const note = Note.createFromObject(dto);

    console.log(note);

    return this.notesRepository.save(note);
  }

  async update(id: number, dto: NoteDto): Promise<UpdateResult> {
    return this.notesRepository.update(id, dto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.notesRepository.delete(id);
  }
}
