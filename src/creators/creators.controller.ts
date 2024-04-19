import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post()
  create(@Body() createCreatorDto: CreateCreatorDto) {
    return this.creatorsService.create(createCreatorDto);
  }

  @Get('api')
  createCreator(){
    return this.creatorsService.createCreator();
  }
 
  @Get()
  findAll() {
    return this.creatorsService.findAll();
  }

  @Get('id/:id')
  findByID(@Param('id') id: string) {
    return this.creatorsService.findByID(id);
  }

  @Get('name')
  findByName(@Body('name') name: string) {
    return this.creatorsService.findByName(name);
    }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatorDto: UpdateCreatorDto) {
    return this.creatorsService.update(id, updateCreatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creatorsService.remove(id);
  }
}
