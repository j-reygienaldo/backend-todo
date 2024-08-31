import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [PrismaModule, UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
