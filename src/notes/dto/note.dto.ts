import { IsDefined, IsString } from 'class-validator';

export class NoteDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  description: string;
}
