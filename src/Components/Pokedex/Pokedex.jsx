import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as _ from "lodash-es";

import List from "./List/List";
import "./pokedex.scss";

const FETCH_LIMIT = 5; //! TEMP
// const FETCH_LIMIT = 30;
const MAX_POKEMON = 1500;
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";


function Pokedex({ clearCache }) {
  const [ pagesLoaded, setPagesLoaded ] = useState( 0 );
  const [ totalPokeCount, updateTotalPokeCount ] = useState( 0 );
  // const [ pokemonPageDetails, setPokemonPageDetails ] = useState( null );
  const [ listProps, setListProps ] = useState( null );

  useEffect(() => {
    console.log( `pokedex - useEffect - listProps updated` );
  }, [ listProps ])

  // const parsePokeBatch = () => {
  // };

  const fetchPokemonPage = async ({ pageParam = 1 }) => {
    console.log( `fetchPokemonPage ~ pageParam => ${pageParam}` );
    console.log( `fetchPokemonPage ~ pagesLoaded => ${pagesLoaded}` );

    const
      offset = ( pageParam * FETCH_LIMIT ) - FETCH_LIMIT, // pg 1 = offset 0, pg 2 = offset 30, etc.
      paramStr = `?offset=${ offset }&limit=${ FETCH_LIMIT }`,
      fetchUrl = BASE_URL + paramStr;

    const response = await fetch( fetchUrl );
    if (!response.ok) {
      debugger;
      throw new Error( "Failed to fetch Pokemon entries" );
    }
    const pageData = await response.json();
    console.assert( !!pageData, `✅ pageData => ${pageData}` );

    return {
      pokemon: pageData.results,
      pageNum: pageParam,
      nextOffset: offset + pageData.results.length,
      moreItemsAvailable: !_.isNull( pageData.next ),
    };
  };

  // const getPokemonDetails = async (url) => {
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch Pokemon info");
  //   }
  //   const pokemonInfo = await response.json();

  //   console.log(`pokemonInfo`, JSON.stringify(pokemonInfo, undefined, 2));
  //   return pokemonInfo;
  // };

  //* Initial Fetch on Load:
  const {
    data: pageData,
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

      // select: pageData => {
      //   console.error("🚀🚀🚀 ~ useInfiniteQuery ~ select - pageData:", pageData);
      //   const parsedData = {
      //     pokemon: data.results,
      //     pageNum: pageParam,
      //     nextOffset: offset + data.results.length,
      //   };
      //   console.error("🚀🚀🚀 ~ useInfiniteQuery ~ select - parsedData:", parsedData);
      //   return parsedData;
      // },

      onSuccess: pageData => {
        // console.error("🚀🚀🚀 ~ onSuccess ~ pageData", pageData);

        // if ( pageData.pageParams.length !== pagesLoaded + 1 ) {
        //   console.error("🚀🚀🚀 ~ Pokedex ~ pageData.pageParams.length !== pagesLoaded + 1", pageData.pageParams.length !== pagesLoaded + 1);
        // }
        // else setPagesLoaded( pageData.pageParams.length );

        // fetchPokemonDetails( pageData );

        updateTotalPokeCount( t => FETCH_LIMIT * pageData.pageParams.length );

        const pagePokemonData = _.flattenDeep(
          _.map( pageData.pages, page =>
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

  // const fetchPokemonDetails = page => {
  //   const {
  //     data: pokemonDetails,
  //     status,
  //     fetchStatus,
  //   } = useQuery({
  //     queryKey: [ 'pokemonPages', 'pokeInfo' ],
  //     queryFn: async = () => {

  //     },
  //     enabled: !!pageData
  //   })

  //   setPokemonPageDetails( pokemonDetails );
  // }


  // const parsePokemonPage = async( pageData ) => {

  //   const basicInfo = ({ name, url }) => ({
  //     name: _.capitalize( name ),
  //     url: url,
  //     id: _.nth( _.split( url, "/" ), -2 )
  //   });

  //   const allDetails = _.flattenDeep(
  //     _.map( pageData.pages, page =>
  //       _.map( page.pokemon, pokemon => ({
  //         ...basicInfo( pokemon ),
  //         ...additionalInfo( pokemon )
  //       })
  //     ))
  //   );

  //   const pokeData = await fetch( url )

  //   // const response = await fetch( fetchUrl );
  //   // if (!response.ok) {
  //   //   debugger;
  //   //   throw new Error( "Failed to fetch Pokemon entries" );
  //   // }

  //   // const data = await response.json();

  //   const details = allDetails;

  //   console.error("🚀🚀🚀 ~ parsePokemonPage ~ details:", details);

  //   return details;
  // }

  function handleScroll( ev ) {
    const {
      scrollTop,
      clientHeight,
      scrollHeight
    } = ev.currentTarget;
    const bottomReached = scrollHeight - ( scrollTop + clientHeight ) < 5;

    if ( scrollHeight - ( scrollTop + clientHeight ) < 100 )
      // console.info(`🚀🚀🚀 ~ handleScroll ~ < 100 ~ ${ scrollHeight - ( scrollTop + clientHeight )}`);

      if ( bottomReached && hasNextPage && !isFetching ) {
      console.info(`🚀🚀🚀 ~ handleScroll ~ ${scrollTop} ${clientHeight} ${scrollHeight}`);

      // _.throttle( () => fetchNextPage(), 5 ); //! not working
      fetchNextPage()
    }
  }

  // function getListProps( pokeData ) {

    // console.log(`parsed`, JSON.stringify(parsed, undefined, 2));

    // const pokemonDetails = d.pages.map((page, index) => (
    //   <li key={index}>
    //     {page.pokemon.map((pokemon) => (
    //       <div key={pokemon.name}>

    //         <img
    //           src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
    //           alt={`${pokemon.name} sprite`}
    //         />
    //         {pokemon.name}
    //       </div>
    //     )
    //     )}
    //   </li>
    // ))
    // return pokemonDetails;
  // }

  function resetList() {
    console.log(`resetList =>`);
    clearCache();
  }

  if (error) return <div>Error fetching Pokemon data</div>;
  if (!pageData) return <div>Loading...</div>;

  const isLoading = ( status === 'loading' );

  return (
    <div className="pokedex">
      <h1>POKEDEX</h1>

      <div className="pd-body container">

        {
          isFetching && (
            <div className="notification is-warning">
              <button className="delete"></button>
              FETCHING
            </div>)
        }

        <div className="pd-buttons">
          <a
            className={ 'button is-light ' + ( isLoading ? ' is-loading' : 'is-warning' )}
            onClick={ fetchNextPage }>
            { pageData && !isLoading && hasNextPage ? "LOAD NEXT" : "NO MORE 2 LOAD" }
          </a>
          <a
            className="button is-danger"
            onClick={ resetList }>
            RESET LIST
          </a>
        </div>


        <div
          className="pd-screen"
          onScroll={ handleScroll }
        >
          {
            listProps ? (
              <List
                pokemonData={ listProps }
                // pokemonCount={ totalPokeCount }
                // loadingNextSet={ isFetchingNextPage }
              ></List>
            ) : (
              <h1>NO POKEMONS YET</h1>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Pokedex
