import React from 'react';
import PokemonList from '../components/PokemonList';
import { useProfile } from '../hooks/useProfile';
import PokemonCard from '../components/PokemonCard';
import { css } from '@emotion/react';

const contentStyle = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
`;

const flexColumnStyle = css`
  flex-grow: 1;
`;

export const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

const redButtonStyle = css`
  background-color: #f44336;
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
    background-color: #d32f2f;
  }
`;

const Home: React.FC = () => {
  const { profile, clearProfile } = useProfile();

  return (
    <div>
      <h1>Pokémon Team Builder</h1>
      <p>Select up to 6 Pokémon for your team!</p>

      <div css={contentStyle}>
        <div css={flexColumnStyle}>
          <PokemonList />
        </div>

        {profile?.pokemon.length && (
          <div css={flexColumnStyle}>
            <h2>
              Your Team:{' '}
              <button css={redButtonStyle} onClick={clearProfile}>
                Clear
              </button>
            </h2>
            <div css={gridStyle}>
              {profile.pokemon?.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
