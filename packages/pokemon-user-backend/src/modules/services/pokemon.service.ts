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

  // Add a Pokémon to the user's profile
  async addPokemonToProfile(id: string) {
    const pokemon = await this.pokemonRepository.findById(id);
    if (!pokemon) {
      throw new NotFoundException(`Pokémon with ID ${id} not found`);
    }

    // Check if the profile can accommodate another Pokémon
    const canAddToProfile = await this.profileService.canAddPokemonToProfile();
    if (!canAddToProfile) {
      throw new BadRequestException('Profile already has 6 Pokémon');
    }

    // Add Pokémon to the profile
    return this.profileService.addPokemonToProfile(pokemon);
  }
}
