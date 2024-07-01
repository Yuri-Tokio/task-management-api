import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, FindAllParamaters } from './task.dto';

@Injectable()
export class TaskService {
    
    private tasks: TaskDto[] = [] 
    
    create(task: TaskDto){
        this.tasks.push(task) 
        console.log(this.tasks)
    }

  findById(id: string): TaskDto {
        const foundTask = this.tasks.filter(t => t.id === id);

        if (foundTask.length){
            return foundTask[0]
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    findAll(params: FindAllParamaters): TaskDto[]{
        
        // filtro cumulativo, se tiver 1 ou mais parametros, pegaremos todos eles
        return this.tasks.filter(t => {
            let match = true;

            if (params.title != undefined && !t.title.includes(params.title)) {
                match = false
            }
            
            if (params.status != undefined && !t.status.includes( params.status)) {
                match = false
            }

            return match;
        })
    }

    update(task: TaskDto){
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);

        if (taskIndex >= 0) {
            this.tasks[taskIndex] = task
            return;
        }
        
        throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST)
    }

    remove(id: string){
        let taskIndex = this.tasks.findIndex(t => t.id === id) 

        if (taskIndex >= 0){
            this.tasks.slice(taskIndex, 1)  // vou remover 1 item do index[taskIndex]
            return
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST)
    }
}