import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // GET /profile/{id}: Get a profile by ID, with its Pokémon
  @Get(':id')
  async getProfileById(@Param('id') profileId: string) {
    // Fetch the profile and associated Pokémon from the service
    return this.profileService.getProfile(profileId);
  }

  @Post()
  async createProfile() {
    return this.profileService.createProfile();
  }

  // POST /profile/{id}/pokemon/{pokemonId}: Add a Pokémon to a profile
  @Post(':id/pokemon/:pokemonId')
  async addPokemonToProfile(
    @Param('id') profileId: string,
    @Param('pokemonId') pokemonId: string
  ) {
    return this.profileService.addPokemonToProfile(profileId, pokemonId);
  }
}
