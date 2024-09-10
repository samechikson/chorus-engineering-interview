import { Controller, Get, Param, Post } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';

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
  async addPokemonToProfile(@Param('id') id: string) {
    return this.pokemonService.addPokemonToProfile(id);
  }
}
