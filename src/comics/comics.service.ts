import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { Comic, ComicDocument } from './schema/comic.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { readFile } from 'fs/promises';
import { stringify } from 'querystring';
import { ComicInterface } from './interface/comic.interface';

const KEY = "ts=1&apikey=90dcd23a80e3b1b433dbd0ed1131367c&hash=80dc4fa8d95909e43f46ffdf1681b024"


@Injectable()
export class ComicsService {
  constructor(@InjectModel(Comic.name) private comicModel: Model<ComicDocument>) { }

  async create(createComicDto:CreateComicDto): Promise<ComicInterface>{
    const comic = new this.comicModel(createComicDto);
    return comic.save();
  }

  async createComics() {
    try {
      const apiMarvel = JSON.parse(await readFile('MarvelAPI.json', 'utf-8'))
      const url = `${apiMarvel.data.results[0].comics.collectionURI}?limit=100&${KEY}`
      const comics = await (await fetch(url)).json()
      const allQuadrinhos = await this.comicModel.find({}, { _id: 0, __v: 0 }).exec()
      const result = Promise.all(comics.data.results.map(async (item) => {
        if (!allQuadrinhos.find(char => char.title === item.title)) {
          const comic = new this.comicModel(
            {
              title: item.title,
              variantDescription: item.variantDescription,
              description: item.description,
              onsaleDate: item.dates.find(date => date.type === 'onsaleDate').date ,
              thumbnail: item.thumbnail.path + '.jpg',
            });
          return comic.save();
        } else {
          return `Quadrinho ${item.title} Já Existente`
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

  findOne(id: string): Promise<ComicInterface> {
    return this.comicModel.findById(id).exec();
  }

  findAll() {
    return this.comicModel.find().exec();
  }

  findByTitle(title: string): Promise<ComicInterface> {
    return this.comicModel.findOne({ title: title }).exec();
  }

  update(id: string, updateComicDto: UpdateComicDto) {
    return this.comicModel.findByIdAndUpdate({_id: id,}, {$set: updateComicDto}, {new: true}).exec();
  }
  
  remove(id: string) {
    return this.comicModel.deleteOne({_id: id}).exec();
  }
}
