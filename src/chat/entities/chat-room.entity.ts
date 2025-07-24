import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
@Unique(['user1', 'user2']) // Har bir juftlik uchun 1 ta chat room bo'ladi
export class ChatRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user1: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user2: User;

  @CreateDateColumn()
  createdAt: Date;
}
