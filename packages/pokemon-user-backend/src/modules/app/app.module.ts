import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';
import { PokemonController } from '../controllers/pokemon.controller';
import { PokemonService } from '../services/pokemon.service';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { TeamRepository } from '../repositories/team.repository';
import { TeamService } from '../services/team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';
import { Team } from '../database/entities/team.entity';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Pokemon, Team])],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepository, TeamService, TeamRepository],
})
export class AppModule {}
