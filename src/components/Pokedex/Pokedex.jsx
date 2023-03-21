import { useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

import List from './List/List'
import usePokemonData from '../../hooks/usePokemonData'
import './pokedex.scss'

const MAX_VISIBLE_ROWS = 5;
const POKEMON_ROW_HEIGHT = 80;
const FETCH_LIMIT = 30;
const PREFETCH_LIMIT = 10;

const Pokedex = ({ clearCache }) => {
  const {
    error,
    pokemonData,
    pokemonCount,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching
  } = usePokemonData( FETCH_LIMIT );

  const parentRef = useRef()
  const rowVirtualizer = useVirtualizer({
    getScrollElement: () => parentRef.current,
    estimateSize: () => POKEMON_ROW_HEIGHT,
    count: hasNextPage ? pokemonCount + FETCH_LIMIT : pokemonCount,
    overscan: 3,
    enableSmoothScroll: true
  })

  useEffect( () => {
    const [ lastItem ] = [...rowVirtualizer.getVirtualItems()].reverse();

    if ( !lastItem ) return;

    const prefetchRowIdx = pokemonCount - PREFETCH_LIMIT;
    const fetchNextCondMet = !!( lastItem.index >= prefetchRowIdx );

    if (
      pokemonData
      && fetchNextCondMet
      && hasNextPage
      && !isLoading
      && !isFetching
    ) fetchNextPage();
  }, [
    hasNextPage,
    rowVirtualizer.getVirtualItems()
  ]);

  const renderListContainer = () => {
    return (
      <div
        ref={ parentRef }
        className='pd-list-container'
        style={{
          height: `${ POKEMON_ROW_HEIGHT * MAX_VISIBLE_ROWS }px`
        }}>
        <List
          pokeData={ pokemonData }
          pokeCount={ pokemonCount }
          listItems={ rowVirtualizer.getVirtualItems() }
          listHeight={ `${rowVirtualizer.getTotalSize()}px` }
          hasNextPage={ !!hasNextPage }/>
      </div>
    )
  }

  function resetData() {
    // for testing
    clearCache();
  }

  return (
    <div className='pokedex'>
      <div className='pd-body--top'>
        <div className='svg-wrapper'>
        <svg fill="none">
            <path d='m 0 124 q 0 6 6 6 h 4 h 230 c 33 0 39 -64 73 -64 h 150 q 7 0 7 -6'/>
          </svg>
        </div>
        <div className='lights'>
          <div className='lights--big'></div>
          <div className='lights--small'>
            <div className='light'></div>
            <div className='light'></div>
            <div className='light'></div>
          </div>
        </div>
      </div>
      <div className='pd-body--center'>
        <div className='pd-screen'> {
          isLoading
            ? <p>Loading...</p>
            : error
              ? <span>Error: {error}</span>
              : pokemonData && pokemonCount && renderListContainer()
        } </div>
      </div>
      <div className='pd-body--bottom'></div>
    </div>
  );
};

export default Pokedex;
