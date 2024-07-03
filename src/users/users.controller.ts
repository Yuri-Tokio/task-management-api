import { UserDto } from './user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService){}
    
    @Post()
    create(@Body() user: UserDto){
        this.UsersService.create(user)
    }
}
