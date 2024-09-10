import React from 'react';
import { useQuery } from '@tanstack/react-query';

import PokemonCard from './PokemonCard';
import { Pokemon } from '../types';
import { gridStyle } from '../pages/Home';

const PokemonList: React.FC = () => {
  const {
    isPending,
    error,
    data: pokemons,
  } = useQuery<Pokemon[]>({
    queryKey: ['repoData'],
    queryFn: () => fetch('/api/pokemon').then((res) => res.json()),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div css={gridStyle}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
