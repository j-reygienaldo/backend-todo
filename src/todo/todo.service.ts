import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto, UpdateTodoDto } from './dto/todo.dto';
import { AuthUser } from 'src/auth/dto/auth-user.interface';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getAllTodo(user: AuthUser) {
    try {
      const getAllTodo = await this.prisma.todo.findMany({
        where: { userId: Number(user.sub) },
        orderBy: { createdAt: 'asc' },
      });

      return {
        status: HttpStatus.OK,
        message: 'Succesfully get all todo data!',
        data: getAllTodo,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getTodoById(id: number, user: AuthUser) {
    try {
      const findTodo = await this.prisma.todo.findFirst({
        where: {
          AND: [{ id }, { userId: Number(user.sub) }],
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'Succesfully get todo!',
        data: findTodo,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async addTodo(data: TodoDto, user: AuthUser) {
    try {
      const addTodo = await this.prisma.todo.create({
        data: {
          ...data,
          isDone: false,
          createdAt: new Date().toISOString(),
          userId: Number(user.sub),
        },
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Succesfully add todo!',
      };
    } catch (error) {
      console.error(error);
    }
  }

  async updateTodo(id: number, data: UpdateTodoDto, user: AuthUser) {
    try {
      const findTodo = await this.prisma.todo.findFirst({
        where: {
          AND: [{ id }, { userId: Number(user.sub) }],
        },
      });

      if (findTodo) {
        await this.prisma.todo.update({
          where: { id },
          data: data,
        });

        return {
          status: HttpStatus.OK,
          message: 'Succesfully update todo!',
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTodo(id: number, user: AuthUser) {
    try {
      const findTodo = await this.prisma.todo.findFirst({
        where: {
          AND: [{ id }, { userId: Number(user.sub) }],
        },
      });

      if (findTodo) {
        const deleted = await this.prisma.todo.delete({
          where: { id },
        });

        await this.prisma.deletedTodo.create({
          data: {
            ...deleted,
            deletedAt: new Date().toISOString(),
          },
        });

        return {
          status: HttpStatus.OK,
          message: 'Succesfully update todo!',
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async restoreTodo(id: number) {
    try {
      console.log(id);
    } catch (error) {
      console.error(error);
    }
  }
}
