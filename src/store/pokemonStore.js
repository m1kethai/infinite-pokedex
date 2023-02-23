import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

//*** "slices" (store modules)
// import { createListSlice } from './listSlice'

// Initial store state:
// const initialState = {
//   loadedPokes: [], // arr
//   queuedPokes: [], // arr
//   visiblePokes: 0, // number
//   loadedPokesIdRange: [ 0, 0 ],
//   queuedPokesIdRange: [ 0, 0 ],
// }

// const testPokes = {
//   loadedPokes: [
//     {
//       name: "LoadedPoke1",
//       type: "fire"
//     },
//     {
//       name: "LoadedPoke2",
//       type: "water"
//     },
//   ],
//   queuedPokes: [
//     {
//       name: "QueuedPoke1",
//       type: "psychic"
//     },
//     {
//       name: "QueuedPoke2",
//       type: "grass"
//     },
//   ]
// };

export const usePokemonStore = create(
  devtools(
    ( get, set ) => ({
      pokemons: [],
      addPokemons: (newPokemons) =>
        set((state) => ({ pokemons: [...state.pokemons, ...newPokemons] }))
    })
  )
  )