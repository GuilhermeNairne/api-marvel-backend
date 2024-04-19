import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class SeriesService {
  
  async createApiJson(serie: string) {
    try {
      const apiMarvel = await fetch(`http://gateway.marvel.com/v1/public/series/${serie}?ts=1&apikey=90dcd23a80e3b1b433dbd0ed1131367c&hash=80dc4fa8d95909e43f46ffdf1681b024`)
      apiMarvel.json().then(item => {
        writeFile('MarvelAPI.json', JSON.stringify(item, null, 2))
      })
      return 'Arquivo Json Criado'
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      throw new HttpException('Erro ao criar arquivo JSON', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
