import { IsNotEmpty, IsOptional } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  title: string;
}

export class UpdateTodoDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  isDone?: boolean;
}
