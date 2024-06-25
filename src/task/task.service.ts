import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
    
    private tasks: TaskDto[] = []   // cadastro em memória para evitar uso de banco de dados nesse momento
    
    // Criando método que recebe tasks
    create(task: TaskDto){
        this.tasks.push(task)   // inserindo objeto no array (task)
        console.log(this.tasks)
    }
}