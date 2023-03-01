import { useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import * as _ from 'lodash-es' //tmp: import all

import usePokemonData from '../../hooks/usePokemonData'
import List from './List/List'
import './pokedex.scss';

// gsap.registerPlugin(ScrollTrigger);

const Pokedex = ({
  clearCache
}) => {

  const {
    status,
    pokemonData,
    pokemonCount,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    error
  } = usePokemonData();

  const parentRef = useRef()

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? pokemonCount + 1 : pokemonCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
    overscan: 3,
    // paddingStart: 4,
    // paddingEnd: 4,
    // debug: true,
  })

  useEffect(() => {
    // console.info(`
    //   useEffect
    // `);
    // console.error("🚀🚀🚀 ~ Pokedex ~ useEffect - pokemonData:", pokemonData);

    const [ lastItem ] = [ ...rowVirtualizer.getVirtualItems()].reverse()

    if (!lastItem) return

    if (
      pokemonData &&
      lastItem.index >= pokemonCount - 1 &&
      hasNextPage &&
      !isLoading
      // && isFetching
    ) {
      console.info(`fetchNextPage`);
      // debugger;
      fetchNextPage();
    }
  }, [
    hasNextPage,
    // fetchNextPage,
    pokemonCount,
    // isFetching,
    // isLoading,
    rowVirtualizer.getVirtualItems(),
  ]);

  const renderListContainer = () => {
    // console.log( `renderListContainer => ${renderListContainer}` );

    return (
        <div
          ref={ parentRef }
          className="pd-list-container"
        >
        <List
          pokeData={ pokemonData }
          pokeCount={ pokemonCount }
          listItems={ rowVirtualizer.getVirtualItems() }
          listHeight={`${rowVirtualizer.getTotalSize()}px`}
          hasNextPage={ !!hasNextPage }
        />

        </div>
    )
  }

  function resetData() {
    clearCache();
  }

  return (
    <div className="pd__body">

      <div className="pd__body--top">
        <div className='svg-wrapper'>
          <svg>
            <path d="M 0 140 L 320 140 L 440 100 L 700 100 L 700 0 L 0 0 L 0 140"></path>
          </svg>
        </div>
      </div>

      <div className="pd__body--center">

        <div className="buttons">
          <a
            className={ 'button is-light ' + ( isLoading ? ' is-loading' : 'is-warning' )}
            onClick={ fetchNextPage }>
            { pokemonData && !isLoading && hasNextPage ? "LOAD NEXT" : "NO MORE 2 LOAD" }
          </a>
          <a
            className="button is-danger"
            onClick={ resetData }>
            RESET POKEMONS
          </a>
        </div>

        <div className='pd-screen'>
          {
            isLoading
              ? (<p>Loading...</p>)
              : error
                ? (<span>Error: {error}</span>)
                : pokemonData && pokemonCount && renderListContainer()
          }
        </div>
      </div>

      <div className="pd__body--bottom">
        {
          isFetching ? (
            <div>
              <h1>TEMP - Updating...</h1>
            </div>
            ) : null
        }

        <div className="catch-em-all">
          gotta catch 'em all!
        </div>
      </div>

    </div>
  );
};

export default Pokedex;
