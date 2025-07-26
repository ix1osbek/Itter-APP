import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private readonly userRepo: Repository<User>
    ) { }

    //////////// register
    async register(createAuthDto: CreateAuthDto) {
        const { email, password, username } = createAuthDto
        try {
            const existingUser = await this.userRepo.findOne({ where: { email } })

            if (existingUser) {
                throw new ConflictException('Foydalanuvchi bazamizda allaqachon mavjud. Iltimos Login qiling');
            }
            const hashedPassword = bcrypt.hash(password, 10)

            const newUser = {
                email: email,
                password: hashedPassword,
                username: username,

            }

        } catch (error) {

        }
    }



    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
