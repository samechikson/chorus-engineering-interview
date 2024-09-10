import React from 'react';
import { useQuery } from '@tanstack/react-query';

import PokemonCard from './PokemonCard';
import { Pokemon } from '../types';
import { css } from '@emotion/react';

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

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
