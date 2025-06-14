/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema }
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService, JwtService],
  exports: [UserService]
})
export class UsersModule { }
