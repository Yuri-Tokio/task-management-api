import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export enum TaskStatusEnum {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}
export class TaskDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    description: string;

    // Enum ajudará a obter as strings pré-definidas como (em progresso, concluído, etc)
    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status: string;

    @IsDateString()
    expirationDate: Date;
}

export interface FindAllParamaters{
    title: string;
    status: string;
}

export class TaskRouteParameters {
    @IsUUID()
    id: string;
}


// A diferença para uma class e uma interface é: interfaces não são mantidas depois de compiladas, as classes sim!
// qlqr coisa ta em 08:40 - https://www.youtube.com/watch?v=yQT274n5Koo&list=PLpcf8hdkpCYseV2ctwAhE4dY-AQ7v5D9S&index=7