import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ComicDocument = HydratedDocument<Comic>;

@Schema()

export class Comic {
    @Prop({ required: true })
    title: string;
    
    @Prop({ required: false })
    variantDescription: string

    @Prop({ required: false })
    description: string;

    @Prop({ required: true })
    onsaleDate: string 
    
    @Prop({ required: true })
    thumbnail: string
  
}

export const ComicSchema = SchemaFactory.createForClass(Comic);
