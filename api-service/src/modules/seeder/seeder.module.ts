import { Module } from '@nestjs/common';
import { seederProviders } from './seeder.provider';
import { SeederService } from './seeder.service';

@Module({
  imports: [],
  providers: [...seederProviders, SeederService],
})
export class SeederModule {}
