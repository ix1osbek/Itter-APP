import {
  Entity,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
@Unique(['follower', 'following']) // Bir foydalanuvchi bir odamni faqat 1 marta follow qila oladi
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.following, { onDelete: 'CASCADE' })
  follower: User; // Kim follow qilmoqda

  @ManyToOne(() => User, user => user.followers, { onDelete: 'CASCADE' })
  following: User; // Kimni follow qilyapti

  @CreateDateColumn()
  createdAt: Date;
}
