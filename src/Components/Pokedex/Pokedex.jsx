import {
  useState,
  useEffect,
  useCallback,
  useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

import * as _ from 'lodash-es' //tmp: import all

import usePokemonData from '../../hooks/usePokemonData'
import List from './List/List'
import './pokedex.scss';

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

  // const renderList = () => {
  // }

  function resetData() {
    clearCache();
  }

  return (
    <div className="pd__body">

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

      <div
        ref={ parentRef }
        className="pd__screen"
      >
        {
          isLoading
            ? (<p>Loading...</p>)
            : error
              ? (<span>Error: {error}</span>)
              : pokemonData && pokemonCount && (
                <List
                  pokeData={ pokemonData }
                  pokeCount={ pokemonCount }
                  listItems={ rowVirtualizer.getVirtualItems() }
                  listHeight={`${rowVirtualizer.getTotalSize()}px`}
                  hasNextPage={ hasNextPage }
                ></List>
              )
              || null
        }

        {
          <div>
            {isFetching ? 'Background Updating...' : null}
          </div>
        }
      </div>
    </div>
  );
};

export default Pokedex;
