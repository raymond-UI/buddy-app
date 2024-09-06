import { IsString, IsInt, IsOptional } from 'class-validator';


export class CreatePomodoroDto {
  @IsString()
  title!: string;

  @IsInt()
  duration!: number; // Duration in minutes

  @IsOptional()
  @IsString()
  notes?: string;
}