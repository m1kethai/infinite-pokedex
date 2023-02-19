import create from 'zustand';

export const usePokestore = create( () => ({
    fetchedPokemon: []
}));