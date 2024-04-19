import { Module } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Creator, CreatorSchema } from './schema/creator.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Creator.name, schema: CreatorSchema }])],
  controllers: [CreatorsController],
  providers: [CreatorsService],
})
export class CreatorsModule {}
