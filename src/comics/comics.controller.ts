import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { SearchComicDTO } from './dto/search-comic.dto';

type ComicsByTitle = {
  titles: string[]
}

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Post()
  create(@Body() createComicDto:CreateComicDto){
    return this.comicsService.create(createComicDto)
  }

  @Get('api')
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
  findByName(@Query ('title') title: string) {
    return this.comicsService.findByTitle(title);
    }

  @Get('search')
  searchTitle(@Body() body: ComicsByTitle) {
    console.log(body.titles)
    return this.comicsService.searchTitle(body.titles);
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
