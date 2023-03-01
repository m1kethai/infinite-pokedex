import React, { useState, useEffect, useCallback } from 'react'
import { useInfiniteQuery } from "@tanstack/react-query"
// import { pick } from 'lodash-es'
import * as _ from 'lodash-es' //tmp: import all


// * FETCH PARAMS:
const FETCH_LIMIT = 30;
const BASE_FETCH_URL = "https://pokeapi.co/api/v2/pokemon";

const usePokemonData = () => {
  const fetchPageData = async ( pageNo ) => {
    const
      offset = pageNo * FETCH_LIMIT,
      limit = FETCH_LIMIT,
      fetchUrl = `${BASE_FETCH_URL}?offset=${offset}&limit=${limit}`;

    const response = await fetch( fetchUrl );
    if ( !response.ok ) {
      debugger;
      throw new Error( "Failed to fetch Pokemon page #" + pageNo );
    }
    const pageData = await response.json();

    return _.omit( pageData, [ 'count', 'previous' ])
  };

  const fetchPokeDetails = async ( pokeResult ) => {
    const pokeDetailsResponse = await fetch( pokeResult.url );
    if ( !pokeDetailsResponse.ok ) {
      debugger;
      throw new Error( "Failed to fetch Pokemon details" );
    }
    const pokeData = await pokeDetailsResponse.json();
    const updatedPokeData = await transformPokeData( pokeData );

    return updatedPokeData;
  };

  const transformPokeData = async ( fetchedPokeData ) => {
    const pokeInfo = _.pick(
      fetchedPokeData,
      ['id', 'name', 'types', 'sprites']
    );

    const formatPokemonTypes = ( pokeTypes ) => {
      if ( !pokeTypes ) return "";

      // ensure the pokemon's primary type is always displayed first
      const sortedTypes = pokeTypes.length === 1 ? pokeTypes : _.sortBy( pokeTypes, [ 'slot' ]);
      const typeList: string[] = [];

      _.each( sortedTypes, type => {
        typeList.push(
          _.has( type, 'type.name' )
            ? _.capitalize( type['type']['name'])
            : ""
        );
      })

      return typeList.join(", ");
    }

    return {
      name: _.capitalize( pokeInfo.name ),
      id: pokeInfo.id,
      imageUrl: _.get( pokeInfo, 'sprites.other.dream_world.front_default' ),
      additionalInfo: {
        types: formatPokemonTypes( pokeInfo.types || null )
      }
    };
  }

  const fetchPokemonData = async ({ pageParam = 0 }) => {
    const pageData = await fetchPageData( pageParam );
    const { results: pagePokes } = pageData;
    const updatedPokeResults = await Promise.all( _.map( pagePokes, fetchPokeDetails ));
    const updatedPageData = { ...pageData, results: updatedPokeResults };

    return updatedPageData;
  };

  const {
    data,
    status,
    error,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
      queryKey: [ "pokemonData" ],
      queryFn: fetchPokemonData,
      getNextPageParam: ( lastPage, pages ) => _.get( lastPage, 'next', "" ).length
        ? pages.length
        : undefined,
      onError: err => {
        console.error("🚀🚀🚀 ~ usePokemonData ~ onError - err:", err);
      }
    });

  const pokemonData = data ? data.pages.flatMap( page => page.results ) : [];
  const pokemonCount = pokemonData.length;

  return {
    status,
    error,
    pokemonData,
    pokemonCount,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage
  };
};

export default usePokemonData;
