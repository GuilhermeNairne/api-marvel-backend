import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get(':serie')
  createApiJson(@Param('serie') serie: string) {
    return this.seriesService.createApiJson(serie);
  }

}
