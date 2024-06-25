import { TaskService } from './task.service';
import { Body, Controller, Post } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Controller('task') // Aqui estamos definindo nosso endpoint /task
export class TaskController {

    // importar aquela task.service aqui via construtor
    constructor(private readonly TaskService: TaskService){}

    @Post()         // Decorator
    create(@Body() task: TaskDto){       // Método que irá receber a taskDTO criada 
        this.TaskService.create(task)
    }
}