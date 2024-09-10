import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';
import { Profile } from '../database/entities/profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  // Find the current profile (for now assuming it's a single profile in the database)
  async findCurrentProfile(): Promise<Pokemon[]> {
    const profile = await this.profileRepository.findOne({
      relations: ['pokemon'], // Assuming the Profile entity has a relationship with Pokémon
    });
    return profile ? profile.pokemon : [];
  }

  // Add a Pokémon to the current profile
  async addPokemonToProfile(pokemon: Pokemon): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      relations: ['pokemon'],
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
  async removePokemonFromProfile(pokemonId: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      relations: ['pokemon'],
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
  async clearProfile(): Promise<void> {
    const profile = await this.profileRepository.findOne({
      relations: ['pokemon'],
    });

    if (profile) {
      profile.pokemon = [];
      await this.profileRepository.save(profile);
    }
  }
}
