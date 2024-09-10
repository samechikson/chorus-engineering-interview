import React from 'react';
import PokemonList from '../components/PokemonList';
import { useProfile } from '../hooks/useProfile';

/**
 * Home component that displays a list of Pokémon
 */
const Home: React.FC = () => {
  const { profile } = useProfile();

  return (
    <div>
      <h1>Pokémon Team Builder</h1>
      <p>Select up to 6 Pokémon for your team!</p>

      {profile?.pokemon && (
        <div>
          <h2>Your Team:</h2>

          {profile.pokemon?.map((pokemon) => (
            <div key={pokemon.id}>{pokemon.name}</div>
          ))}
        </div>
      )}

      <PokemonList />
    </div>
  );
};

export default Home;
