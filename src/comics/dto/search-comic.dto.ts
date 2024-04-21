import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";


export class SearchComicDTO {
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    titles: string[]; // Lista de nomes a serem pesquisados
  }