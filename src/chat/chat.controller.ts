import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api')
export class ChatController {
    constructor(private readonly messageService: ChatService) { }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('sendMessage')
    async sendMessage(
        @Body() body: { sender: string; receiver: string; content: string },
    ) {
        return await this.messageService.sendMessage(body);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('viewMessages/:userId')
    async viewMessages(@Param('userId') userId: string) {
        return await this.messageService.viewMessages(userId);
    }

}
