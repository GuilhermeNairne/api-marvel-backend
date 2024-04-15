import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character, CharacterDocument } from './schema/Character.schema';
import { CharacterInterface } from './interface/character.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { writeFile, readFile } from 'fs/promises';

const KEY = "ts=1&apikey=90dcd23a80e3b1b433dbd0ed1131367c&hash=80dc4fa8d95909e43f46ffdf1681b024"

@Injectable()
export class CharactersService {
  constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) { }

  async createApiJson() {
    try {
      const apiMarvel = await fetch('http://gateway.marvel.com/v1/public/series/1067?ts=1&apikey=90dcd23a80e3b1b433dbd0ed1131367c&hash=80dc4fa8d95909e43f46ffdf1681b024')
      apiMarvel.json().then(item => {
        writeFile('MarvelAPI.json', JSON.stringify(item, null, 2))
      })
      return 'Arquivo Json Criado'
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      throw new HttpException('Erro ao criar arquivo JSON', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createCharacters() {
    try {
      const apiMarvel = JSON.parse(await readFile('MarvelAPI.json', 'utf-8'))
      const url = `${apiMarvel.data.results[0].characters.collectionURI}?limit=100&${KEY}`
      const characters = await (await fetch(url)).json()
      const allPerson = await this.characterModel.find({}, { _id: 0, __v: 0 }).exec()
      const result = Promise.all(characters.data.results.map(async (item) => {
        if (!allPerson.find(char => char.name === item.name)) {
          const character = new this.characterModel(
            {
              name: item.name,
              description: item.description,
              urlImage: item.thumbnail.path + ".jpg",
            });
          return character.save();
        } else {
          return `Personagem ${item.name} Já Existente`
        }
      }))
      return result
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      if (error.code === 'ENOENT') {
        throw new HttpException('Arquivo MarvelAPI.json não encontrado', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Erro ao criar personagens', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  findOne(id: string): Promise<CharacterInterface> {
    return this.characterModel.findById(id).exec();
  }


  findAll() {
    return this.characterModel.find().exec();
  }

  findByName(name: string): Promise<CharacterInterface> {
    return this.characterModel.findOne({ name: name }).exec();
  }


  update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return this.characterModel.findByIdAndUpdate({_id: id,}, {$set: updateCharacterDto}, {new: true}).exec();
  }

  remove(id: string) {
    return this.characterModel.deleteOne({_id: id}).exec();
  }
}
