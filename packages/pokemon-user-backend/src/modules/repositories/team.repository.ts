import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';
import { Team } from '../database/entities/team.entity';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  // Find the current team (for now assuming it's a single team in the database)
  async findCurrentTeam(): Promise<Pokemon[]> {
    const team = await this.teamRepository.findOne({
      relations: ['pokemon'], // Assuming the Team entity has a relationship with Pokémon
    });
    return team ? team.pokemon : [];
  }

  // Add a Pokémon to the current team
  async addPokemonToTeam(pokemon: Pokemon): Promise<Team> {
    const team = await this.teamRepository.findOne({
      relations: ['pokemon'],
    });

    if (team) {
      team.pokemon.push(pokemon);
      return this.teamRepository.save(team);
    }

    // If no team exists, create a new one and add the Pokémon
    const newTeam = this.teamRepository.create({ pokemon: [pokemon] });
    return this.teamRepository.save(newTeam);
  }

  // Remove a Pokémon from the team
  async removePokemonFromTeam(pokemonId: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      relations: ['pokemon'],
    });

    if (team) {
      team.pokemon = team.pokemon.filter(
        (pokemon) => pokemon.id !== parseInt(pokemonId)
      );
      return this.teamRepository.save(team);
    }

    throw new Error('Team not found');
  }

  // Clear the entire team
  async clearTeam(): Promise<void> {
    const team = await this.teamRepository.findOne({
      relations: ['pokemon'],
    });

    if (team) {
      team.pokemon = [];
      await this.teamRepository.save(team);
    }
  }
}
