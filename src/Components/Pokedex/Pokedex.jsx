//TODO: COMPONENTS: FWD/BACK BTNS?
//!PROPS: listScrollPosition,
//!ACTIONS: fetchNextBatch, loadPrevBatch

// import { map, head, get, pick } from 'lodash-es';
// import * as _ from 'lodash-es';

import { usePokeDataStore } from '~/store/pokestore.js'
// import { shallow } from 'zustand/shallow'

import List from './List/List'
import './pokedex.scss'


function Pokedex() {

  // const fullState = usePokeDataStore.getState();
  // console.debug("🚀🚀🚀  Pokedex  fullState", fullState);

  const loadedPokes = usePokeDataStore( state => state.loadedPokes );
  const queuedPokes = usePokeDataStore( state => state.queuedPokes );

  // const LoadedPokeNames = () => <ul>{ _.map( loadedPokes, poke => <li>{poke.name}</li> ) }</ul>

  function fetchNextPokes() {
    console.log( `fetchNextPokes => ${fetchNextPokes}` );
  }

  return (
    <div className="pokedex">
      <h1>POKEDEX</h1>

      <div className="pd-body container">
        <div className="buttons">
          <a className="button is-primary">Primary</a>
          <a className="button is-link">Link</a>
        </div>

        <div className="pd-list container">
          <List
            pokes={ loadedPokes }
            oldPokes={ queuedPokes }
          />
        </div>

      </div>
    </div>
  )
}

export default Pokedex
