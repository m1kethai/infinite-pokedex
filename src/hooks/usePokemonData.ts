import React, { useState, useEffect, useCallback } from 'react'
import { useInfiniteQuery } from "@tanstack/react-query"
// import { pick } from 'lodash-es'
import * as _ from 'lodash-es' //tmp: import all


// * FETCH PARAMS:
const MAX_FETCH_SIZE = 20;

const usePokemonData = () => {

  const fetchPageData = async ( pageNo ) => {
    const
      offset = pageNo * MAX_FETCH_SIZE,
      limit = MAX_FETCH_SIZE,
      pageFetchUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    const response = await fetch( pageFetchUrl );

    if ( !response.ok ) {
      debugger;
      throw new Error( "Failed to fetch Pokemon page #" + pageNo );
    }

    const pageData = await response.json();

    return _.omit( pageData, [
      // 'next',
      'count',
      'previous'
    ])
  };

  const fetchPokeDetails = async ( pokeResult ) => {
    const pokeDetailsResponse = await fetch( pokeResult.url );

    if ( !pokeDetailsResponse.ok ) {
      debugger;
      throw new Error( "Failed to fetch Pokemon details" );
    }

    const pokeData = await pokeDetailsResponse.json();
    const updatedPokeData = await transformPokeData( pokeData );

    console.error(`🚀🚀 fetchPokeDetails - updatedPokeData:`, updatedPokeData);

    return updatedPokeData;
  };

  const transformPokeData = async ( originalPokeData ) => {
    const pokeInfo = _.pick(
      originalPokeData,
      [ 'id', 'name', 'types', 'sprites' ]
    );

    const formatPokemonTypes = ( pokeTypes ) => {
      if ( !pokeTypes )
        return "";

      // ensure that the pokemon's primary type is always displayed first
      const sortedTypes = pokeTypes.length === 1 ? pokeTypes : _.sortBy( pokeTypes, [ 'slot' ]);

      const typeList: string[] = [];

      _.each( sortedTypes, type => {
        typeList.push(
          // _.capitalize( type['type']['name'])
          _.has( type, 'type.name' )
            ? _.capitalize( type['type']['name'])
            : ""
        );
      })

      const formatted = typeList.join(", ");
      return formatted;
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

    // console.error("🚀🚀🚀 ~ fetchPokemonData ~ pageData:", pageData);

    const updatedPokeResults = await Promise.all( _.map( pagePokes, fetchPokeDetails ));
    const updatedPageData = {
      ...pageData,
      results: updatedPokeResults
    };

    return updatedPageData;
  };

  const {
    data,
    status,
    isSuccess,
    isError,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage
  } = useInfiniteQuery({
      queryKey: [ "pokemonData" ],
      queryFn: fetchPokemonData,
      // select: data => {},
      getNextPageParam: ( lastPage, pages ) => {
        // const next = !_.isNull( lastPage.next ) ? pages.length : undefined;
        const next = _.get( lastPage, 'next', "" ).length ? pages.length : undefined;
        // console.log( `getNextPageParam next => ${next}` );

        return next;
      },

      keepPreviousData: false,
      // onSuccess: data => {
      //   console.info("🚀🚀🚀 ~ usePokemonData ~ onSuccess - data:", data);
      // },
      onError: err => {
        console.error("🚀🚀🚀 ~ usePokemonData ~ onError - err:", err);
      },
    });

  const pokemonData = data ? data.pages.flatMap( page => page.results ) : [];
  const pokemonCount = pokemonData.length;

  // const pokemonData = data?.pages.flatMap((page) => page.results) ?? [];

// debugger;

  return {
    pokemonData,
    pokemonCount,
    isLoading,
    isFetching,
    isFetchingNextPage,
    status,
    error,
    hasPreviousPage,
    hasNextPage,
    fetchNextPage
  };
};

export default usePokemonData;
