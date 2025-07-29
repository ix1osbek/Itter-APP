import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    post: Post;

    @CreateDateColumn()
    createdAt: Date;
}
