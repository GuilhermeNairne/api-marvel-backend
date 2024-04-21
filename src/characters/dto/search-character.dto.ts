import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";


export class SearchCharacterDTO {
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    names: string[]; // Lista de nomes a serem pesquisados
  }