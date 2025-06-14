/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User' }) sender: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'User' }) receiver: Types.ObjectId;
    @Prop({ required: true }) content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
