import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto, UpdateTodoDto } from './dto/todo.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { AuthUser as User } from 'src/auth/dto/auth-user.interface';

@UseGuards(AuthGuard)
@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodo(@AuthUser() user: User) {
    return this.todoService.getAllTodo(user);
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.todoService.getTodoById(id, user);
  }

  @Post()
  addTodo(@Body() dto: TodoDto, @AuthUser() user: User) {
    return this.todoService.addTodo(dto, user);
  }

  @Patch('/:id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto,
    @AuthUser() user: User,
  ) {
    return this.todoService.updateTodo(id, dto, user);
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.todoService.deleteTodo(id, user);
  }
}
