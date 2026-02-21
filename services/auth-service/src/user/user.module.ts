import { Module } from '@nestjs/common';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { CloudinaryProvider } from 'src/common/providers/cloudinary.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HashingModule],
  controllers: [UserController],
  providers: [UserService, CloudinaryProvider],
  exports: [UserService],
})
export class UserModule {}
