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
import { RegisterDto } from 'src/auth/dto/register.dto/register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
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
