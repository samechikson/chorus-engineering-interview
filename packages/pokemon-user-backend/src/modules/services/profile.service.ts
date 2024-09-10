import { Injectable, BadRequestException } from '@nestjs/common';
import { ProfileRepository } from '../repositories/profile.repository';
import { PokemonRepository } from '../repositories/pokemon.repository';

@Injectable()
export class ProfileService {
  private readonly MAX_TEAM_SIZE = 6;

  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly pokemonRepository: PokemonRepository
  ) {}

  // Create a new profile
  async createProfile() {
    return this.profileRepository.createProfile();
  }

  // Check if we can add another Pokémon to the profile
  async canAddPokemonToProfile(profileId: string): Promise<boolean> {
    const profile = await this.profileRepository.findProfile(profileId);
    return profile.pokemon.length < this.MAX_TEAM_SIZE;
  }

  // Add a Pokémon to the profile
  async addPokemonToProfile(profileId: string, pokemonId: string) {
    const profile = await this.profileRepository.findProfile(profileId);
    const pokemon = await this.pokemonRepository.findById(pokemonId);

    if (!profile) {
      throw new BadRequestException(`Profile with ID ${profileId} not found`);
    }

    if (!pokemon) {
      throw new BadRequestException(`Pokémon with ID ${pokemonId} not found`);
    }

    if (profile.pokemon.length >= this.MAX_TEAM_SIZE) {
      throw new BadRequestException(
        `Profile with ID ${profileId} is already at maximum capacity`
      );
    }

    // Check if the Pokémon is already in the profile
    if (profile.pokemon.some((p) => p.id === pokemon.id)) {
      throw new BadRequestException(
        `Pokémon with ID ${pokemonId} is already in the profile`
      );
    }

    return this.profileRepository.addPokemonToProfile(profileId, pokemon);
  }

  // Get the current profile
  async getProfile(profileId: string) {
    const profile = this.profileRepository.findProfile(profileId);

    if (!profile) {
      throw new BadRequestException(`Profile with ID ${profileId} not found`);
    }

    return profile;
  }

  // Remove a Pokémon from the profile by its ID
  async removePokemonFromProfile(profileId: string, pokemonId: string) {
    const profile = await this.profileRepository.findProfile(profileId);
    const pokemonToRemove = profile.pokemon.find(
      (pokemon) => pokemon.id === parseInt(pokemonId)
    );

    if (!pokemonToRemove) {
      throw new BadRequestException(
        `Pokémon with ID ${pokemonId} is not in the profile`
      );
    }

    return this.profileRepository.removePokemonFromProfile(
      profileId,
      pokemonId
    );
  }

  // Clear the entire profile
  async clearProfile(profileId: string) {
    return this.profileRepository.clearProfile(profileId);
  }
}
