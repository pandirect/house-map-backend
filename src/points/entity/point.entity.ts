import { plainToClass } from 'class-transformer';
import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Point {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column('text', {nullable: true})
  address: string;

  @ApiProperty()
  @Column('integer', {nullable: true})
  type: number;

  @ApiProperty()
  @Column('integer', {nullable: true})
  specialization: number;

  @ApiProperty()
  @Column('text', {nullable: true})
  info_number: string;

  @ApiProperty()
  @Column('text', {nullable: true})
  info_action: string;

  @ApiProperty()
  @Column('text', {nullable: true})
  scheme_number: string;

  @ApiProperty()
  @Column('text', {nullable: true})
  square: string;

  @ApiProperty()
  @Column('integer', {nullable: true})
  status: number;

  @ApiProperty()
  @Column('double precision', {nullable: true})
  positionx: number;

  @ApiProperty()
  @Column('double precision', {nullable: true})
  positiony: number;

  @ApiProperty()
  @Column('json', {nullable: true})
    // eslint-disable-next-line @typescript-eslint/ban-types
  images: object;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;
  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: string;

  static createFromObject<T>(object: T): Point {
    return plainToClass(Point, object);
  }

  @BeforeUpdate()
  private update?() {
    this.updated_at = new Date().toISOString();
  }
}
