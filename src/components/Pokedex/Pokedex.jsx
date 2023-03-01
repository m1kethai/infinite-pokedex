import { useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

import usePokemonData from '../../hooks/usePokemonData'
import List from './List/List'
import './pokedex.scss';

const MAX_VISIBLE_ROWS = 5;
const POKEMON_ROW_HEIGHT = 80;


const Pokedex = ({ clearCache }) => {
  const {
    pokemonData,
    pokemonCount,
    isLoading,
    hasNextPage,
    fetchNextPage,
    error
  } = usePokemonData();

  const parentRef = useRef()
  const rowVirtualizer = useVirtualizer({
    getScrollElement: () => parentRef.current,
    estimateSize: () => POKEMON_ROW_HEIGHT,
    count: hasNextPage ? pokemonCount + 1 : pokemonCount,
    overscan: 3
  })

  useEffect(() => {
    const [ lastItem ] = [...rowVirtualizer.getVirtualItems()].reverse()
    if (!lastItem) return

    if (
      pokemonData
      && lastItem.index >= pokemonCount - 1
      && hasNextPage
      && !isLoading
    ) fetchNextPage();
  }, [
    hasNextPage,
    pokemonCount,
    rowVirtualizer.getVirtualItems(),
  ]);

  const renderListContainer = () => {
    return (
      <div
        ref={ parentRef }
        className="pd-list-container"
        style={{
          height: `${POKEMON_ROW_HEIGHT * MAX_VISIBLE_ROWS}px`
        }}>
        <List
          pokeData={ pokemonData }
          pokeCount={ pokemonCount }
          listItems={ rowVirtualizer.getVirtualItems() }
          listHeight={`${rowVirtualizer.getTotalSize()}px`}
          hasNextPage={ !!hasNextPage }/>
      </div>
    )
  }

  function resetData() {
    clearCache();
  }

  return (
    <div className="pokedex">

      <div className="pd-body--top">
        <div className='svg-wrapper'>
          <svg><path d="m 0 124 q 0 6 6 6 h 4 h 230 c 33 0 39 -64 73 -64 h 150 q 7 0 7 -6"/></svg>
        </div>
      </div>

      <div className="pd-body--center">
        <div className='pd-screen'> {
            isLoading
              ? (<p>Loading...</p>)
              : error
                ? (<span>Error: {error}</span>)
                : pokemonData && pokemonCount && renderListContainer()
        } </div>
      </div>

      <div className="pd-body--bottom">
        <div className="catchem">
          gotta catch 'em all!
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
