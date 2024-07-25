import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid'
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {


    // importar o repository pra fazer as manipulações de crud do usuário
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) {}

    
    async create(newUser: UserDto){
        const userAlreadyRegistered = await this.findByUserName(newUser.username)


        if (userAlreadyRegistered){
            console.log(`User ${newUser.username} already registered`)
        }


        const dbUser = new UserEntity()
        dbUser.username = newUser.username
        dbUser.passwordHash = bcryptHashSync(newUser.password, 10)


        const {id, username} = await this.usersRepository.save(dbUser)


        return { id, username }
    } 


    async findByUserName(username: string): Promise<UserDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: { username }
        })
        
        
        if (!userFound){
            return null;
        }


        return{
            id: userFound.id,
            username: userFound.username,
            password: userFound.passwordHash

        }
    }
}
