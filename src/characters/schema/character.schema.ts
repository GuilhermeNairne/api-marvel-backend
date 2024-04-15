import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character {
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: false })
    description: string;
  
    @Prop({ required: true })
    urlImage: string;
  
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
