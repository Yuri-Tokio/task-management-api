import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
    controllers: [TaskController],
    providers: [TaskService]  // foi importado no taskService e não no task module
})
export class TaskModule {}
