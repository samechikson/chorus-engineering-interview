import { Injectable, BadRequestException } from '@nestjs/common';
import { TeamRepository } from '../repositories/team.repository';
import { Pokemon } from '../database/entities/pokemon.entity';

@Injectable()
export class TeamService {
  private readonly MAX_TEAM_SIZE = 6;

  constructor(private readonly teamRepository: TeamRepository) {}

  // Check if we can add another Pokémon to the team
  async canAddPokemonToTeam(): Promise<boolean> {
    const team = await this.teamRepository.findCurrentTeam();
    return team.length < this.MAX_TEAM_SIZE;
  }

  // Add a Pokémon to the team
  async addPokemonToTeam(pokemon: Pokemon) {
    const team = await this.teamRepository.findCurrentTeam();

    if (team.length >= this.MAX_TEAM_SIZE) {
      throw new BadRequestException(
        'Cannot add more than 6 Pokémon to the team'
      );
    }

    // Save the new Pokémon to the team
    return this.teamRepository.addPokemonToTeam(pokemon);
  }

  // Get the current team
  async getTeam() {
    return this.teamRepository.findCurrentTeam();
  }

  // Remove a Pokémon from the team by its ID
  async removePokemonFromTeam(id: string) {
    const team = await this.teamRepository.findCurrentTeam();
    const pokemonToRemove = team.find((pokemon) => pokemon.id === parseInt(id));

    if (!pokemonToRemove) {
      throw new BadRequestException(`Pokémon with ID ${id} is not in the team`);
    }

    return this.teamRepository.removePokemonFromTeam(id);
  }

  // Clear the entire team
  async clearTeam() {
    return this.teamRepository.clearTeam();
  }
}
