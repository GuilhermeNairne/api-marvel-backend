import {ArrayMinSize, IsArray, IsNotEmpty, IsString} from 'class-validator'


export class CreateCreatorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    role: string;
    
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    comics: string[];
}
