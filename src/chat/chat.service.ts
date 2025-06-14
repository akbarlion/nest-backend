import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './chat.schema';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
    ) { }

    async sendMessage(data: { sender: string; receiver: string; content: string }) {
        const newMessage = new this.messageModel(data);
        return await newMessage.save();
    }

    async viewMessages(userId: string) {
        return await this.messageModel
            .find({
                $or: [{ sender: userId }, { receiver: userId }],
            })
            .sort({ createdAt: -1 })
            .populate('sender', 'username email')
            .populate('receiver', 'username email')
            .exec();
    }

}
