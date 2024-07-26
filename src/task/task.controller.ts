import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FindAllParamaters, TaskDto, TaskRouteParameters } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post()
    async create(@Body() task: TaskDto): Promise<TaskDto> {
        return await this.taskService.create(task)
    }

    @Get('/:id')
    async findById(@Param('id') id: string): Promise<TaskDto> {
        return await this.taskService.findById(id)
    }

    @Get()
    async findAll(@Query() params: FindAllParamaters): Promise<TaskDto[]> {
        return await this.taskService.findAll(params)
    }

    @Put('/:id')
    async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
        await this.taskService.update(params.id, task);
    }

    @Delete('/:id')
    remove(@Param() params: TaskRouteParameters,) {
        return this.taskService.remove(params.id);
    }
}