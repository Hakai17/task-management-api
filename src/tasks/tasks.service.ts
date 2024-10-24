// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAllByUser(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { user: { id: userId } } });
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    return this.taskRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
