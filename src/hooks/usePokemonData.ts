import React, { useState, useEffect } from 'react';

import { PokemonPageFetchResponse, PagePokemonResult } from '../types/pokemon';

const SPRITE_URL = pokeId => `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${ pokeId }.svg`;
const IMG_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/pokemonIndex.png`;


export const usePokemonData = () => {
  const [ pokemonData, setPokemonData ] = useState({});

  const [ pageData, setPageData ] = useState({});
  const [ pokemonInfo, setPokemonInfo ] = useState([]);

  useEffect(() => {

      //* Initial Fetch on Load:
      const {
        data,
        status,
        error,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        // hasPreviousPage,
        // fetchPreviousPage,
        // isFetchingPreviousPage,
        } = useInfiniteQuery({
          queryKey: [ 'pokemonPages' ],
          queryFn: fetchPokemonPage,
          refetchOnWindowFocus: false,

          // select: data => {
          //   console.error("🚀🚀🚀 ~ useInfiniteQuery ~ select - data:", data);
          //   const parsedData = {
          //     pokemon: data.results,
          //     pageNum: pageParam,
          //     nextOffset: offset + data.results.length,
          //   };
          //   console.error("🚀🚀🚀 ~ useInfiniteQuery ~ select - parsedData:", parsedData);
          //   return parsedData;
          // },

          onSuccess: data => {
            // console.error("🚀🚀🚀 ~ onSuccess ~ data", data);

            // if ( data.pageParams.length !== pagesLoaded + 1 ) {
            //   console.error("🚀🚀🚀 ~ Pokedex ~ data.pageParams.length !== pagesLoaded + 1", data.pageParams.length !== pagesLoaded + 1);
            // }
            // else setPagesLoaded( data.pageParams.length );

            // fetchPokemonDetails( data );

            updateTotalPokeCount( t => FETCH_LIMIT * data.pageParams.length );

            const pagePokemonData = _.flattenDeep(
              _.map( data.pages, page =>
                _.map( page.pokemon, pokemon => ({
                  pokemonData: pokemon
                })
              ))
            );

            setListProps(
              pagePokemonData
            );
          },

          getNextPageParam: lastPage => {
            const nextPageParam = lastPage.pageNum + 1;
            // console.info("🚀🚀🚀 useInfiniteQuery ~ nextPageParam", nextPageParam);
            return nextPageParam;
          },
          // getPreviousPageParam: (firstPage, lastPage, allPages) => {
          //   const ppp = firstPage.pageNum - 1;
          //   console.error("🚀🚀🚀 ~ Pokedex ~ ppp", ppp);
          //   return ppp;
          // },
          // useErrorBoundary
          // suspense
        }
      );
    //# ex.
    // const fetchPaymentMethods = async () => {
    //   const url = "https://online-ordering.com/api/payment-methods";
    //   const response = await fetch(url);
    //   const methods: await response.json();
    //   setPaymentMethods(convertPaymentMethods(methods));
    // };
    // fetchPaymentMethods();

  }, []);

  return {
    fetchPokemonPage,
    pagePokemonData,
  };
};
