/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User, UserDocument } from './schemas/users.schema';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { RegisterDto } from 'src/auth/dto/register.dto/register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    ) { }

    async createUser(registerDto: RegisterDto): Promise<User> {
        const { email, username, password } = registerDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.userModel({
            email,
            username,
            password: hashedPassword,
        });

        return newUser.save();
    }

    async createProfile(userId: string, data: any) {
        const profile = new this.profileModel({
            userId,
            name: data.name,
            birthday: data.birthday,
            height: data.height,
            weight: data.weight,
            interests: data.interests,
            zodiac: data.zodiac,
            horoscope: data.horoscope
        });

        return await profile.save();
    }

    async getProfile(userId: string) {
        return await this.profileModel.findOne({ userId }).exec();
    }

    async updateProfile(userId: string, data: any) {
        return await this.profileModel.findOneAndUpdate({ userId }, data, { new: true });
    }


    // 🔍 Cari user pake email atau username
    async findByEmailOrUsername(identifier: string): Promise<User | null> {
        return this.userModel.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        }).exec();
    }

    // 🔍 Cari berdasarkan email
    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    // 🔍 Cari berdasarkan username
    async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
    }

    // 🔍 Cari berdasarkan ID
    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async findOne(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
    }

}
