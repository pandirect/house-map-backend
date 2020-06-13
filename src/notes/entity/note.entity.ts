import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { INote } from '../interfaces';
import { plainToClass } from 'class-transformer';

@Entity()
export class Note implements INote {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('text')
  title: string;
  @Column('text')
  description: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: string;

  static createFromObject<T>(object: T): Note {
    return plainToClass(Note, object);
  }

  @BeforeUpdate()
  private update?() {
    this.updated_at = new Date().toISOString();
  }
}
