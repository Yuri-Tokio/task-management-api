import { TaskService } from './task.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Controller('task')
export class TaskController {

    constructor(private readonly TaskService: TaskService){}

    @Post()         
    create(@Body() task: TaskDto){       
        this.TaskService.create(task)
    }

    @Get('/:id')       
    findById(@Param('id') id: string) : TaskDto{     
        return this.TaskService.findById(id)
    }   

    @Put()
    update(@Body() task: TaskDto){
        this.TaskService.update(task)
    }
}