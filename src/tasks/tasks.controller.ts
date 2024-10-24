import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt')) // Protege todas as rotas com JWT
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(@Request() req) {
    // Retorna todas as tasks do usuário autenticado
    return this.tasksService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create({
      ...createTaskDto,
      user: req.user.userId,
    });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
