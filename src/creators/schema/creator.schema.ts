import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type CreatorDocument = HydratedDocument<Creator>;

@Schema()

export class Creator {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    role: string

    @Prop({ required: true })
    comics: string[]


}

export const CreatorSchema = SchemaFactory.createForClass(Creator);
