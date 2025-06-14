/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
    @Prop({ required: true })
    userId: string;

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
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);