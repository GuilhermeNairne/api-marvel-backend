import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarvelModule } from './marvel/marvel.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MarvelModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
