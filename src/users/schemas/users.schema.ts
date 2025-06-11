/* eslint-disable prettier/prettier */


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: false })
    name: string;

    @Prop({ required: false })
    birthday: string;

    @Prop({ required: false })
    height: number;

    @Prop({ required: false })
    weight: number;

    @Prop({ type: [String], required: false })
    interests: string[];

    @Prop()
    zodiac?: string;

    @Prop()
    horoscope?: string;

    @Prop({ unique: true, sparse: true })
    email?: string;

    @Prop({ unique: true, sparse: true })
    username?: string;

    @Prop()
    password?: string;
    _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
