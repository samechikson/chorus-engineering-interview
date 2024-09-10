import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { ProfileService } from './profile.service';

@Injectable()
export class PokemonService {
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly profileService: ProfileService
  ) {}

  // Fetch the first 150 Pokémon
  async getAllPokemon() {
    // Call the repository to get the list of Pokémon
    const pokemonList = await this.pokemonRepository.findAll();
    if (!pokemonList) {
      throw new NotFoundException('No Pokémon found');
    }
    return pokemonList;
  }

  // Get a Pokémon by ID
  async getPokemonById(id: string) {
    const pokemon = await this.pokemonRepository.findById(id);
    if (!pokemon) {
      throw new NotFoundException(`Pokémon with ID ${id} not found`);
    }
    return pokemon;
  }
}
