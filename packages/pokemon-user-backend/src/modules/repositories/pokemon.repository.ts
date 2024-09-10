import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';

@Injectable()
export class PokemonRepository {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  // Fetch the first 150 Pokémon
  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      take: 150, // Limit to the first 150 Pokémon
      order: {
        id: 'ASC', // Assuming the Pokémon are ordered by ID
      },
    });
  }

  // Find a Pokémon by its ID
  async findById(id: string): Promise<Pokemon> {
    return this.pokemonRepository.findOne({
      where: { id: parseInt(id) }, // Cast the ID to an integer
    });
  }
}
