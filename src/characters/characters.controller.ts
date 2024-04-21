import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { SearchCharacterDTO } from './dto/search-character.dto';
import { CharacterInterface } from './interface/character.interface';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto)
  }

  @Get('api')
  createCharacters() {
    return this.charactersService.createCharacters()
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @Get('name')
  findByName(@Body('name') name: string) {
    return this.charactersService.findByName(name);
  }

  @Get('search')
  searchName(@Body() searchCharacterDTO: SearchCharacterDTO) {
    return this.charactersService.searchNames(searchCharacterDTO.names);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}
