import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { ComicsModule } from './comics/comics.module';
import { CreatorsModule } from './creators/creators.module';
import { SeriesModule } from './series/series.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Prisco:prisco123@cluster0.wq0eeik.mongodb.net/'), CharactersModule, ComicsModule, CreatorsModule, SeriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
