import {IsNotEmpty, IsString} from 'class-validator'

export class CreateCharacterDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsString()
    description: string;
  
    @IsString()
    @IsNotEmpty()
    urlImage: string;
}

