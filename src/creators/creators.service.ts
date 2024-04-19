import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Creator, CreatorDocument } from './schema/creator.schema';
import { CreatorInterface } from './interface/creator.interface';
import { readFile } from 'fs/promises';

const KEY = "ts=1&apikey=90dcd23a80e3b1b433dbd0ed1131367c&hash=80dc4fa8d95909e43f46ffdf1681b024"


@Injectable()
export class CreatorsService {
  constructor(@InjectModel(Creator.name) private creatorModel: Model<CreatorDocument>) { }

  create(createCreatorDto: CreateCreatorDto): Promise<CreatorInterface>{
    const creator = new this.creatorModel(createCreatorDto);
    return creator.save();
  }

  async createCreator() {
    try {
      const apiMarvel = JSON.parse(await readFile('MarvelAPI.json', 'utf-8'))

      const criadores = apiMarvel.data.results[0].creators.items
      // const url = `${apiMarvel.data.results[0].creators.items}?limit=100&${KEY}`
      // const creator = await (await fetch(url)).json()
      
      const allCriadores = await this.creatorModel.find({}, { _id: 0, __v: 0 }).exec()

      const result = Promise.all(criadores.map(async (item) => {
        const urlCreatorsComics = await fetch(`${item.resourceURI}?limit=100&${KEY}`).then(res => res.json())
        const comicsArray = []
        const urlComi = `${urlCreatorsComics.data.results[0].comics.collectionURI}?limit=20&${KEY}`
        const comicsItem = await fetch(urlComi).then(res => res.json())
        comicsItem.data.results.map(res => comicsArray.push(res.title))
        // const total = urlCreatorsComics.data.results[0].comics.available
        // const num = Math.floor(total / 100)
        // for (let i = 0; i <= num; i++) {
        //   const urlComi = `${urlCreatorsComics.data.results[0].comics.collectionURI}?limit=100&offset=${i * 100}&${KEY}`
        //   const comicsItem = await fetch(urlComi).then(res => res.json())
        //   comicsItem.data.results.map(res => comicsArray.push(res.title))
        // }
        if (!allCriadores.find(char => char.name === item.name)) {
          const creator = new this.creatorModel(
            {
              name: item.name,
              role: item.role,
              comics: comicsArray,
            });
          return creator.save();
        } else {
          return `Criador ${item.name} Já Existente`
        }
      }))
      return result
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      if (error.code === 'ENOENT') {
        throw new HttpException('Arquivo MarvelAPI.json não encontrado', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Erro ao criar Quadrinhos', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  findByID(id: string): Promise<CreatorInterface> {
      return this.creatorModel.findById(id).exec();
    }

  findAll() {
    return this.creatorModel.find().exec();
  }

  findByName(name: string): Promise<CreatorInterface> {
    return this.creatorModel.findOne({ name: name }).exec();
  }

  update(id: string, updateCreatorDto: UpdateCreatorDto) {
    return this.creatorModel.findByIdAndUpdate({_id: id,}, {$set: updateCreatorDto}, {new: true}).exec();
  }
  
  remove(id: string) {
    return this.creatorModel.deleteOne({_id: id}).exec();
  }
}
