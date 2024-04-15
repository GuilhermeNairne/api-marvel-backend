import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { ComicsModule } from './comics/comics.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Prisco:prisco123@cluster0.wq0eeik.mongodb.net/'), CharactersModule, ComicsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
