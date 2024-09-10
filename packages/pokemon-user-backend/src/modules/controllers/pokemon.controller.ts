import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
// import { CreatePokemonDto } from '../dtos/create-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // GET /pokemon
  @Get()
  async getAllPokemon() {
    // Fetch the first 150 Pokémon from the service
    return this.pokemonService.getAllPokemon();
  }

  // GET /pokemon/:id
  @Get(':id')
  async getPokemonById(@Param('id') id: string) {
    // Fetch the details of a specific Pokémon by its ID
    return this.pokemonService.getPokemonById(id);
  }

  // POST /pokemon/:id
  @Post(':id')
  async addPokemonToTeam(@Param('id') id: string) {
    // Add a Pokémon to the user's team
    return this.pokemonService.addPokemonToTeam(id);
  }
}
