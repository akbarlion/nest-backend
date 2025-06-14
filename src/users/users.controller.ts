/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards, Request, Get, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api')
export class UsersController {
    constructor(
        private userService: UserService
    ) { }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('getProfile')
    getProfile(@Request() req) {
        const userId = req.user.userId
        return this.userService.getProfile(userId)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('createProfile')
    createProfile(@Body() body, @Request() req) {
        const userId = req.user.userId;
        return this.userService.createProfile(userId, body);
    }


    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put('updateProfile')
    updateProfile(@Body() body, @Request() req) {
        const userId = req.user.userId;
        return this.userService.updateProfile(userId, body);
    }



}
