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

const MAX_VISIBLE_POKEMON = 90;

const Pokedex = () => {
  // const [pokemonListData, setPokemonListData] = useState({});
  // const [totalPagesFetched, setTotalPagesFetched] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);

  const {
    pokemonData,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    // totalPagesFetched,
  } = usePokemonData();

  const pokemonListData = _.flattenDeep( ...[ pokemonData?.pages ]);
  const allPokemonRows = pokemonData ? pokemonData.pages.flatMap((d) => d.rows) : []
  console.error("🚀🚀🚀 ~ Pokedex ~ pokemonListData:", pokemonListData);

  const parentRef = useRef()

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allPokemonRows.length + 1 : allPokemonRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  })
  // useEffect(() => {
  //   fetchPokemonData();
  // }, []);

  // const handleLoadMore = useCallback(() => {
  //   if (Object.keys(pokemonListData).length < MAX_VISIBLE_POKEMON) {
  //     return;
  //   }
  //   const lastPageIndex = Object.keys(pokemonListData).length;
  //   const lastPage = pokemonListData[`page-${lastPageIndex}`];
  //   fetchPokemonData(lastPage.next);
  // }, [fetchPokemonData, pokemonListData]);

  // const fetchNextGroup = useCallback(() => {
  //   const nextPageIndex = Object.keys(pokemonListData).length + 1;
  //   const nextGroup = pokemonListData[`page-${nextPageIndex}`];
  //   if (!nextGroup) {
  //     return;
  //   }
  //   const nextGroupPokemon = Object.values(nextGroup.pokemon);
  //   setPokemonData((prevData) => {
  //     const newData = { ...prevData };
  //     delete newData[`page-${nextPageIndex - 1}`];
  //     return newData;
  //   });
  //   setIsLoading(false);
  //   setTotalPagesFetched(totalPagesFetched + 1);
  // }, [pokemonData, setPokemonData, setIsLoading, setTotalPagesFetched]);

  // const isLoadingMore = isLoading && Object.keys(pokemonData).length > 0;
  // const memoizedPokemonData = React.useMemo(() => pokemonData, [pokemonData]);

  return (
    <div className="list-container">

      {/* <List
        pokemonData={memoizedPokemonData}
        isLoading={isLoadingMore}
        onLoadMore={handleLoadMore}
        fetchNextGroup={fetchNextGroup}
      /> */}
    </div>
  );
};

export default Pokedex;
