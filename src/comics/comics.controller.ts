import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Post()
  createComics(){
    return this.comicsService.createComics();
  }
  
  @Get()
  findAll() {
    return this.comicsService.findAll();
  }
  
  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.comicsService.findOne(id);
    }

  @Get('title')
  findByName(@Body ('title') title: string) {
    return this.comicsService.findByTitle(title);
    }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComicDto: UpdateComicDto) {
    return this.comicsService.update(id, updateComicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comicsService.remove(id);
  }
}