import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  providers: [SeedService, PokemonService],
  imports: [PokemonModule, CommonModule, HttpModule, ConfigModule],
})
export class SeedModule {}
