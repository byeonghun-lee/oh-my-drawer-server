import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Box {
    @Prop({ required: true, enum: ['inbox', 'trash'] })
    @IsString()
    name: string;

    @Prop({ required: true })
    userId: mongoose.Types.ObjectId;
}

export type BoxDocument = Box & Document;

export const BoxSchema = SchemaFactory.createForClass(Box);
