import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
    
    private tasks: TaskDto[] = []   // cadastro em memória para evitar uso de banco de dados nesse momento
    
    // Criando método que recebe tasks
    create(task: TaskDto){
        this.tasks.push(task)   // inserindo objeto no array (task)
        console.log(this.tasks)
    }

    findById(id: string): TaskDto {
        const foundTask = this.tasks.filter(t => t.id === id);
        // isso em cima, é pra saber se no array tasks temos alguem com o mesmo id do parâmetro

        if (foundTask.length){
            return foundTask[0]
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    update(task: TaskDto){
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);

        if (taskIndex >= 0) {
            this.tasks[taskIndex] = task
            return;
        }
        
        throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST)
    }

}