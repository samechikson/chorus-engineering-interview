import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';
import { Profile } from '../database/entities/profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  // Create a new profile
  async createProfile(): Promise<Profile> {
    const profile = this.profileRepository.create({ pokemon: [] });
    return this.profileRepository.save(profile);
  }

  async findProfile(profileId: string): Promise<Profile> {
    return await this.profileRepository.findOne({
      relations: ['pokemon'],
      where: { id: profileId },
    });
  }

  // Add a Pokémon to the current profile
  async addPokemonToProfile(
    profileId: string,
    pokemon: Pokemon
  ): Promise<Profile> {
    // Find the profile by ID
    const profile = await this.profileRepository.findOne({
      relations: ['pokemon'],
      where: { id: profileId },
    });

    if (profile) {
      profile.pokemon.push(pokemon);
      return this.profileRepository.save(profile);
    }

    // If no profile exists, create a new one and add the Pokémon
    const newProfile = this.profileRepository.create({ pokemon: [pokemon] });
    return this.profileRepository.save(newProfile);
  }

  // Remove a Pokémon from the profile
  async removePokemonFromProfile(
    profileId: string,
    pokemonId: string
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      relations: ['pokemon'],
      where: { id: profileId },
    });

    if (profile) {
      profile.pokemon = profile.pokemon.filter(
        (pokemon) => pokemon.id !== parseInt(pokemonId)
      );
      return this.profileRepository.save(profile);
    }

    throw new Error('Profile not found');
  }

  // Clear the entire profile
  async clearProfile(profileId: string): Promise<void> {
    const profile = await this.profileRepository.findOne({
      relations: ['pokemon'],
      where: { id: profileId },
    });

    if (profile) {
      profile.pokemon = [];
      await this.profileRepository.save(profile);
    }
  }
}
