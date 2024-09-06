import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdatePomodoroDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  duration?: number; // Duration in minutes

  @IsOptional()
  @IsString()
  notes?: string;
}