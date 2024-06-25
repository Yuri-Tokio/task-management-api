import { TaskService } from './task.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Controller('task') // Aqui estamos definindo nosso endpoint /task
export class TaskController {

    // importar aquela task.service aqui via construtor
    constructor(private readonly TaskService: TaskService){}

    @Post()         // Decorator
    create(@Body() task: TaskDto){       // Método que irá receber a taskDTO criada 
        this.TaskService.create(task)
    }

    @Get('/:id')        // :id é um parametro
    findById(@Param('id') id: string) : TaskDto{     
        // nome do método 
        // @Param é um 'Route Param' para obter todos os parametros passados na rota
        // : TaskDto é pra definirmos que o tipo de retorno será TaskDto
        return this.TaskService.findById(id)
    }   
}