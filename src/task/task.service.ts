import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, FindAllParamaters, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
    
    private tasks: TaskDto[] = [] 
    
    create(task: TaskDto){
        task.id = uuid()    // nova task com id automático
        task.status = TaskStatusEnum.TO_DO  // nova task com status automático
        
        this.tasks.push(task) 
    }

  findById(id: string): TaskDto {
        const foundTask = this.tasks.filter(t => t.id === id);

        if (foundTask.length){
            return foundTask[0]
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    findAll(params: FindAllParamaters): TaskDto[]{
        
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
            this.tasks.slice(taskIndex, 1)
            return
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST)
    }
}