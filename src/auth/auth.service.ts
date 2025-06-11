/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto): Promise<User> {
        const { email, username, password } = registerDto;

        const existing = await this.userModel.findOne({
            $or: [{ email }, { username }],
        });

        if (existing) {
            throw new ConflictException('Email or Username already used');
        }

        const hashed = await bcrypt.hash(password, 10);

        const createdUser = new this.userModel({
            email,
            username,
            password: hashed,
        });

        return createdUser.save();
    }


    // async login(loginDto: LoginDto): Promise<any> {
    //     const { identifier, password } = loginDto;

    //     const user = await this.userService.findByEmailOrUsername(identifier);
    //     if (!user) {
    //         throw new UnauthorizedException('User not found');
    //     }

    //     const isMatch = await bcrypt.compare(password, user.password || '');
    //     if (!isMatch) {
    //         throw new UnauthorizedException('Invalid credentials');
    //     }

    //     const payload = { sub: user._id, email: user.email, username: user.username };
    //     return {
    //         message: 'Login success',
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(username);
        console.log(user);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isMatch = await bcrypt.compare(pass, user.password || '');
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }


    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const { identifier, password } = loginDto;
        const user = await this.userService.findByEmailOrUsername(identifier);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password || '');
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }



}
