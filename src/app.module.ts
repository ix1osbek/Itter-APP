import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { FollowModule } from './follow/follow.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chat/entities/chat-room.entity';
import { Comment } from './comment/entities/comment.entity';
import { Follow } from './follow/entities/follow.entity';
import { Like } from './like/entities/like.entity';
import { Post } from './post/entities/post.entity';
import { User } from './user/entities/user.entity';
import { EmailModule } from './email/email.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: Number(process.env.DB_PORT),
            username: "postgres",
            password: process.env.DB_PASSWORD,
            database: 'itter',
            entities: [ChatRoom, Comment, Follow, Like, Post, User],
            synchronize: true
        }),
        UserModule, AuthModule, PostModule, CommentModule, LikeModule, FollowModule, ChatModule, EmailModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
