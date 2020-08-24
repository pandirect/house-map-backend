import { Injectable } from '@nestjs/common';
import { INote } from './interfaces';
import { NoteDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

type TSortableData = { [P in keyof Note]?: "ASC" | "DESC" | 1 | -1 }

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async findAll(params: TSortableData): Promise<INote[]> {
    return this.notesRepository.find({
      order: params
    });
  }

  async findOne(id: number): Promise<INote> {
    return this.notesRepository.findOne({ where: { id } });
  }

  async create(dto: NoteDto): Promise<INote> {
    const note = Note.createFromObject(dto);

    return this.notesRepository.save(note);
  }

  async update(id: number, dto: NoteDto): Promise<UpdateResult> {
    return this.notesRepository.update(id, dto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.notesRepository.delete(id);
  }
}
