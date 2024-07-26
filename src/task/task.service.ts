import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, FindAllParamaters, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>
    ) {}

    private tasks: TaskDto[] = []

    async create(task: TaskDto) {
        
        // criar uma taskToSave, conversão do DTO para o banco de dados.
        const taskToSave: TaskEntity = {
            title: task.title,
            description: task.description,
            expirationDate: task.expirationDate,
            status: TaskStatusEnum.TO_DO
        }

        const createdTask = await this.taskRepository.save(taskToSave)

        return this.mapEntityToDto(createdTask)
    }

    findById(id: string): TaskDto {
        const foundTask = this.tasks.filter(t => t.id === id);

        if (foundTask.length) {
            return foundTask[0]
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    findAll(params: FindAllParamaters): TaskDto[] {

        return this.tasks.filter(t => {
            let match = true;

            if (params.title != undefined && !t.title.includes(params.title)) {
                match = false
            }

            if (params.status != undefined && !t.status.includes(params.status)) {
                match = false
            }

            return match;
        })
    }

    update(task: TaskDto) {
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);

        if (taskIndex >= 0) {
            this.tasks[taskIndex] = task
            return;
        }

        throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST)
    }

    remove(id: string) {
        let taskIndex = this.tasks.findIndex(t => t.id === id)

        if (taskIndex >= 0) {
            this.tasks.slice(taskIndex, 1)
            return
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST)
    }

    // Função para mapear DTO da entidade para a controller
    private mapEntityToDto(taskEntity: TaskEntity): TaskDto {
        return {
            id: taskEntity.id,
            title: taskEntity.title,
            description: taskEntity.description,
            expirationDate: taskEntity.expirationDate,
            status: TaskStatusEnum[taskEntity.status],
            // vai instanciar o enum baseado no valor que está recebendo
        }
    }

}