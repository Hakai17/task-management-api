// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Adicionando o TypeOrmModule e Task entity
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
