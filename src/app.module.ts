import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { FollowModule } from './follow/follow.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UserModule, AuthModule, PostModule, CommentModule, LikeModule, FollowModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
