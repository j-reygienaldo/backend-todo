import { IsNotEmpty, IsOptional } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  title: string;
}

export class UpdateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  isDone?: boolean;
}
