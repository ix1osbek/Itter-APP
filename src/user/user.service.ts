import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { UpdateProfileDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepo: Repository<User>,
    ) { }

    async updateProfile(userId: string, dto: UpdateProfileDto): Promise<User> {
        try {
            const user = await this.userRepo.findOneBy({ id: userId });
            if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

            Object.assign(user, dto);

            return await this.userRepo.save(user);
        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new InternalServerErrorException('Serverda xato yuz berdi')
        }
    }

    /////////////////   all users
    async findAll() {
        try {
            const allUsers = await this.userRepo.find()

            if (!allUsers || allUsers.length === 0) throw new NotFoundException("Foydalanuvchilar topilmadi")

            return allUsers
        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new InternalServerErrorException('Serverda xato yuz berdi')
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateProfileDto: UpdateProfileDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
