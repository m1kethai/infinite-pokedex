import { create } from 'zustand';

//*** "slices" (store modules)
// import { createListSlice } from './listSlice'

// TODO: only keep this slice if I decide to make an individual pokemon "profile" page later
// import { createPokeProfileSlice } from './createPokeProfileSlice'

// Initial store state:
const initialState = {
  loadedPokes: [], // arr
  queuedPokes: [], // arr
  visiblePokes: 0, // number
  loadedPokesIdRange: [ 0, 0 ],
  queuedPokesIdRange: [ 0, 0 ],
}

const testPokes = {
  loadedPokes: [
    {
      name: "LoadedPoke1",
      type: "fire"
    },
    {
      name: "LoadedPoke2",
      type: "water"
    },
  ],
  queuedPokes: [
    {
      name: "QueuedPoke1",
      type: "psychic"
    },
    {
      name: "QueuedPoke2",
      type: "grass"
    },
  ]
};

export const usePokeDataStore = create( set => ({
  // loadedPokes: [], // arr
  // queuedPokes: [], // arr

  //# TMP
  loadedPokes: testPokes.loadedPokes,
  queuedPokes: testPokes.queuedPokes,

  visiblePokes: 0, // number
  loadedPokeIdRange: [ 0, 0 ], // 2 num arr
  queuedPokeIdRange: [ 0, 0 ], // 2 num arr


  // updateVisiblePokes: () => set(state => ({ bears: state.bears + 1 })),
  // appendPokes: () => set(state => ({ bears: state.bears + 1 })),
  // prependPokes: () => set(state => ({ bears: state.bears + 1 })),

}))

// export const createListSlice = ( set ) => ({
//   addBear: () => set((state) => ({ bears: state.bears + 1 })),
//   eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
// });

// export const createListSlice = ( set ) => ({
//   visibleItems: 0,
//   visiblePokesIdRange: [ 0, 0 ],
//   upcomingPokesIdRange: [ 0, 0 ],
//   addBear: () => set((state) => ({ bears: state.bears + 1 })),
//   eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
// });

// export const usePokeDataStore = create((...a) => ({
//   ...createListSlice(...a),
// }))
