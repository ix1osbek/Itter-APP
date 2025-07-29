import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { Follow } from 'src/follow/entities/follow.entity';
import { ChatRoom } from 'src/chat/entities/chat-room.entity';
import { UserRole } from '../user-role.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    content: string;
    fullName: string;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    avatarUrl: string;


    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;


    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    otp: string;

    @Column({ nullable: true, type: 'timestamp' })
    otpTime: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    // Relationships
    @OneToMany(() => Post, post => post.author)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];

    @OneToMany(() => Follow, follow => follow.follower)
    following: Follow[];

    @OneToMany(() => Follow, follow => follow.following)
    followers: Follow[];

    @OneToMany(() => ChatRoom, chatRoom => chatRoom.user1)
    chatRoomsAsUser1: ChatRoom[];

    @OneToMany(() => ChatRoom, chatRoom => chatRoom.user2)
    chatRoomsAsUser2: ChatRoom[];
}
