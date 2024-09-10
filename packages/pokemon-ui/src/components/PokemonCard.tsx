/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../main';
import { useProfile } from '../hooks/useProfile';

const cardStyle = css`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const imageStyle = css`
  max-width: 60px;
  object-fit: cover;
`;

const buttonStyle = css`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const { addPokemonToProfile } = useProfile();
  return (
    <div css={cardStyle}>
      <img src={pokemon.imageUrl} alt={pokemon.name} css={imageStyle} />
      <div>
        <h3>{pokemon.name}</h3>

        <button
          css={buttonStyle}
          type="button"
          onClick={() => addPokemonToProfile(pokemon.id)}
        >
          Add to team
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
