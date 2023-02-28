import React, { useState, useEffect, useCallback } from 'react'
import { useInfiniteQuery } from "@tanstack/react-query"
// import { pick } from 'lodash-es'
import * as _ from 'lodash-es' //tmp: import all


// * PAGE FETCH PARAMS:
const MAX_FETCH_SIZE = 5;

const usePokemonData = () => {
  const [totalPagesFetched, setTotalPagesFetched] = useState(0);

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

    return pageData;

    // return _.omit( data, [
    //   'next',
    //   'previous',
    //   // discard prev/next fetch urls and only include the total pokemon "count" value during the initial page fetch
    //   // !hasPreviousPage && 'count'
    // ])
  };

  const fetchPokeDetails = async ( pokeResult ) => {
    const pokeResp = await fetch( pokeResult.url );
    if ( !pokeResp.ok ) {
      debugger;
      throw new Error( "Failed to fetch Pokemon details" );
    }
    const pokeData = await pokeResp.json();
    const updatedPokeData = transformPokeData( pokeData );

    console.log( `updatedPokeData`, JSON.stringify(updatedPokeData, undefined, 2) );

    return updatedPokeData;
  };

  const transformPokeData = ( data ) => {
    const pokeInfo = _.pick( data, [
      'id',
      'name',
      'types',
      'sprites'
    ]);

    const getFormattedTypes = ( types = null ) => {
      if ( !types ) return "";

      let formatted: string;
      const typeList: string[] = [];
      const sortedTypes = _.sortBy( types, [ 'slot' ]);

      _.each( sortedTypes, pokeType => {
        const typeStr = _.capitalize( pokeType.type.name );
        typeList.push( typeStr );
      })

      formatted = typeList.join(", ");
      console.error("🚀🚀🚀 ~ getFormattedTypes ~ formatted:", formatted);

      return formatted;
    }

    return {
      name: _.capitalize( pokeInfo.name ),
      id: pokeInfo.id,
      imageUrl: _.get( pokeInfo, 'sprites.other.dream_world.front_default' ),
      additionalInfo: {
        types: getFormattedTypes( pokeInfo.types )
      }
    };
  }

  const fetchPokemonData = async ( pageParam ) => {
    const pageData = await fetchPageData( pageParam );
    const { results: pagePokes } = pageData;

    console.error("🚀🚀🚀 ~ fetchPokemonData ~ pageData:", pageData);

    const updatedPokeResults = await Promise.all( _.map( pagePokes, fetchPokeDetails ));

    // const updatedPageData = _.assign( pageData, {
    //   results: updatedPokeResults
    // });
    const updatedPageData = {
      ...pageData,
      results: updatedPokeResults
    };

    return updatedPageData;

    // return {
    //   pokemonList,
    //   pokemonDetails,
    //   nextPage: nextPage + 1,
    //   hasMore: response.next !== null,
    // };
    // const pokemonData = {};
    // let totalPagesFetched = 0;

    // pages.forEach((page) => {
    //   if (page.status === "fulfilled") {
    //     const { results } = page.value;
    //     const pageData = {};
    //     results.forEach(async (result) => {
    //       const pokemonDetails = await fetchPagePokeDetails(result.url);
    //       const {
    //         name,
    //         id,
    //         types,
    //         sprites: { other },
    //         url,
    //       } = pokemonDetails;
    //       const imageUrl = other[ "official-artwork" ].front_default;

    //       pageData[ id ] = {
    //         name,
    //         id,
    //         type: types[ 0 ].type.name,
    //         url,
    //         imageUrl,
    //       };
    //     });

    //     pokemonData[ `page-${totalPagesFetched}` ] = pageData;
    //     totalPagesFetched++;
    //   }
    // });

    // return { totalPagesFetched, pokemonData };
  };

  const {
    data: pokemonData,
    status,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage
  } = useInfiniteQuery(
    [ "pokemonData" ],
    ({ pageParam = 0 }) => fetchPokemonData( pageParam ),
    {
      //* parse and combine page + page poke details responses
      // select: data => {
      // },

      // getNextPageParam: ( lastPage ) => {
      //   console.error("🚀🚀🚀 ~ usePokemonData ~ lastPage:", lastPage);
      //   const { next } = lastPage;
      //   return next
      //     ? lastPage.results.length / MAX_PAGE_SIZE
      //     : undefined;
      // },

      keepPreviousData: true,
      onSuccess: data => {
        console.error("🚀🚀🚀 ~ usePokemonData ~ data:", data);
      },
      onError: err => {
        console.error("🚀🚀🚀 ~ usePokemonData ~ useInfiniteQuery - err:", err);
      },
    }
  );

  return {
    isLoading,
    isFetching,
    // totalPagesFetched: pokemonData.totalPagesFetched,
    pokemonData,
    hasNextPage,
    fetchNextPage
  };
};

export default usePokemonData;
