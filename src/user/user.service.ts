import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { UpdateProfileDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService
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


    findAll() {
        return `This action returns all user`;
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
