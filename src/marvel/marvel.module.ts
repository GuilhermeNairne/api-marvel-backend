import { Module } from '@nestjs/common';
import { MarvelService } from './marvel.service';
import { MarvelController } from './marvel.controller';

@Module({
  controllers: [MarvelController],
  providers: [MarvelService],
})
export class MarvelModule {}
