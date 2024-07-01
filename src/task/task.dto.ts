export class TaskDto {
    id: string;
    title: string;
    description: string;
    status: string;
    expirationDate: Date;
    
}

export interface FindAllParamaters{
    title: string;
    status: string;
}


// A diferença para uma class e uma interface é: interfaces não sao mantidas depois de compiladas, as classes sim!
// qlqr coisa ta em 08:40 - https://www.youtube.com/watch?v=yQT274n5Koo&list=PLpcf8hdkpCYseV2ctwAhE4dY-AQ7v5D9S&index=7