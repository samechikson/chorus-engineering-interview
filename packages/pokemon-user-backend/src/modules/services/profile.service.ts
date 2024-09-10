import { Injectable, BadRequestException } from '@nestjs/common';
import { ProfileRepository } from '../repositories/profile.repository';
import { Pokemon } from '../database/entities/pokemon.entity';

@Injectable()
export class ProfileService {
  private readonly MAX_TEAM_SIZE = 6;

  constructor(private readonly profileRepository: ProfileRepository) {}

  // Check if we can add another Pokémon to the profile
  async canAddPokemonToProfile(): Promise<boolean> {
    const profile = await this.profileRepository.findCurrentProfile();
    return profile.length < this.MAX_TEAM_SIZE;
  }

  // Add a Pokémon to the profile
  async addPokemonToProfile(pokemon: Pokemon) {
    const profile = await this.profileRepository.findCurrentProfile();

    if (profile.length >= this.MAX_TEAM_SIZE) {
      throw new BadRequestException(
        'Cannot add more than 6 Pokémon to the profile'
      );
    }

    // Save the new Pokémon to the profile
    return this.profileRepository.addPokemonToProfile(pokemon);
  }

  // Get the current profile
  async getProfile() {
    return this.profileRepository.findCurrentProfile();
  }

  // Remove a Pokémon from the profile by its ID
  async removePokemonFromProfile(id: string) {
    const profile = await this.profileRepository.findCurrentProfile();
    const pokemonToRemove = profile.find(
      (pokemon) => pokemon.id === parseInt(id)
    );

    if (!pokemonToRemove) {
      throw new BadRequestException(
        `Pokémon with ID ${id} is not in the profile`
      );
    }

    return this.profileRepository.removePokemonFromProfile(id);
  }

  // Clear the entire profile
  async clearProfile() {
    return this.profileRepository.clearProfile();
  }
}
