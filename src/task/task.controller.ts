import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FindAllParamaters, TaskDto } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
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

    @Get()       
    findAll(@Query() params: FindAllParamaters): TaskDto[]{
        return this.TaskService.findAll(params)
    }
    
    @Put('/:id')
    update(@Body() task: TaskDto){
        this.TaskService.update(task)
    }

    @Delete('/:id')
    remove(@Param('id') id: string){
        return this.TaskService.remove(id)
    }
}