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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Note implements INote {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ApiProperty()
  @Column('text')
  title: string;
  @ApiProperty()
  @Column('text')
  description: string;
  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;
  @ApiProperty()
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
