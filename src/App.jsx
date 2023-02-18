// import { useState } from 'react'

//* Components
import Pokedex from '@/Pokedex/Pokedex.jsx'
//* Styles
import './main.scss'

// import { usePokeDataStore } from '~/store/pokestore.js'

// ================================================

function App() {
  //; full state for testing
  // const appState = usePokeDataStore( state => state );

  // console.info(`ℹ️~🧮~ℹ️~🧮~ℹ️~🧮~ℹ️~🧮~ℹ️~🧮~ℹ️~🧮~ℹ️
  //   loadedPokes, activePokeName =>
  //   ${loadedPokes, activePokeName}
  // `);

  return (
    <div className="App">

      <div className="logo"></div>

      <div className="pokedex-wrapper">
        <Pokedex/>
      </div>
    </div>
  )
}

export default App
