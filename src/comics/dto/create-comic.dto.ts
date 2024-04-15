import {IsNotEmpty, IsString} from 'class-validator'


export class CreateComicDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    variantDescription: string

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    onsaleDate: string 

    @IsNotEmpty()
    @IsString()
    thumbnail: string
}
