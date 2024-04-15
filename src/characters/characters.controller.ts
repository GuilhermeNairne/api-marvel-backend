import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post('api')
  createApiJson(){
    return this.charactersService.createApiJson();
  }
  
  @Post()
  createCharacters(){
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

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.charactersService.findByName(name);
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
