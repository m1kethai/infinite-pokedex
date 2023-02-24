import React, { useState, useCallback } from "react";
import * as _ from "lodash-es";

import usePokemonData from "../../hooks/usePokemonData";
import List from "./List/List";

import "./pokedex.scss";


const MAX_VISIBLE_POKEMON = 90;

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState({});
  const [totalPagesFetched, setTotalPagesFetched] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchPokemonData } = usePokemonData();

  const handleLoadMore = useCallback(() => {
    if (Object.keys(pokemonData).length < MAX_VISIBLE_POKEMON) {
      return;
    }
    const lastPageIndex = Object.keys(pokemonData).length;
    const lastPage = pokemonData[`page-${lastPageIndex}`];
    fetchPokemonData(lastPage.next);
  }, [fetchPokemonData, pokemonData]);

  const fetchNextGroup = useCallback(() => {
    const nextPageIndex = Object.keys(pokemonData).length + 1;
    const nextGroup = pokemonData[`page-${nextPageIndex}`];
    if (!nextGroup) {
      return;
    }
    const nextGroupPokemon = Object.values(nextGroup.pokemon);
    setPokemonData((prevData) => {
      const newData = { ...prevData };
      delete newData[`page-${nextPageIndex - 1}`];
      return newData;
    });
    setIsLoading(false);
    setTotalPagesFetched(totalPagesFetched + 1);
  }, [pokemonData, setPokemonData, setIsLoading, setTotalPagesFetched]);

  const isLoadingMore = isLoading && Object.keys(pokemonData).length > 0;

  const memoizedPokemonData = React.useMemo(() => pokemonData, [pokemonData]);

  React.useEffect(() => {
    fetchPokemonData("https://pokeapi.co/api/v2/pokemon?limit=0&offset=0");
  }, [fetchPokemonData]);

  return (
    <div>
      <List
        pokemonData={memoizedPokemonData}
        isLoading={isLoadingMore}
        onLoadMore={handleLoadMore}
        fetchNextGroup={fetchNextGroup}
      />
    </div>
  );
};

export default Pokedex;
