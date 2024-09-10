import { useQuery, useMutation } from '@tanstack/react-query';
import { Profile } from '../types';
import { queryClient } from '../main';

// Custom hook to fetch and mutate profile
export const useProfile = () => {
  const profileId = sessionStorage.getItem('profileId');

  // Fetch the profile by ID, but only if profileId exists
  const {
    refetch,
    isLoading,
    error,
    data: profile,
  } = useQuery<Profile>({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      let response;
      console.log('profileId', profileId);
      if (!profileId) {
        response = await fetch('/api/profile', {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Failed to create profile');
        }
      } else {
        response = await fetch(`/api/profile/${profileId}`);
        if (response.status === 404) {
          response = await fetch('/api/profile', {
            method: 'POST',
          });
          if (!response.ok) {
            throw new Error('Failed to create profile');
          }
        }
      }
      const profile = await response.json();
      sessionStorage.setItem('profileId', profile.id);
      return profile;
    },
  });

  // Mutation to add a Pokémon to the profile
  const addPokemonToProfileMutation = useMutation({
    mutationFn: async (pokemonId: number) => {
      const response = await fetch(
        `/api/profile/${profileId}/pokemon/${pokemonId}`,
        {
          method: 'POST',
        }
      );
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
    },
    onError: (error) => {
      alert('Failed to add Pokémon to profile: ' + error.message);
    },
  });

  // Mutation to clear the profile of
  const clearProfileMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/profile/${profileId}/pokemon`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
    },
    onError: (error) => {
      alert('Failed to clear profile: ' + error.message);
    },
  });

  return {
    profile,
    addPokemonToProfile: (pokemonId: number) =>
      addPokemonToProfileMutation.mutate(pokemonId),
    clearProfile: () => clearProfileMutation.mutate(),
    refetchProfile: refetch, // Manually refetch if needed
    isLoading: addPokemonToProfileMutation.isPending || isLoading, // Loading state
    error: error || addPokemonToProfileMutation.isError, // Error handling
  };
};
