import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';
import { PokemonController } from '../controllers/pokemon.controller';
import { PokemonService } from '../services/pokemon.service';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';
import { Profile } from '../database/entities/profile.entity';
import { ProfileRepository } from '../repositories/profile.repository';
import { ProfileService } from '../services/profile.service';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Pokemon, Profile])],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    PokemonRepository,
    ProfileService,
    ProfileRepository,
  ],
})
export class AppModule {}
