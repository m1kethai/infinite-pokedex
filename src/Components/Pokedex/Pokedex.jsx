import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as _ from "lodash-es";

import List from "./List/List";
import "./pokedex.scss";
import { usePokemonStore } from "../../store/pokemonStore.js";

const FETCH_LIMIT = 30;
const MAX_POKEMON = 1500;
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";



function Pokedex() {
  const [pokemons, addPokemons] = usePokemonStore((state) => [
    state.pokemons,
    state.addPokemons
  ]);

  const fetchPokemonPage = async ({ pageParam = 1 }) => {
    const offset = ( pageParam * FETCH_LIMIT ) - FETCH_LIMIT; // pg 1 = offset 0, pg 2 = offset 30, etc.
    const fetchParams = `?offset=${ offset }&limit=${ FETCH_LIMIT }`
    const fetchUrl = BASE_URL + fetchParams;

    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon batch");
    }
    const data = await response.json();

    return {
      pokemon: data.results,
      nextOffset: offset + data.results.length
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

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    } = useInfiniteQuery(
      [ "pokePage" ],
      fetchPokemonPage,
      {
        getNextPageParam: (lastPage, allPages) => {
          // console.log( `lastPage`, JSON.stringify(lastPage, undefined, 2) );
          // console.log( `allPages`, JSON.stringify(allPages, undefined, 2) );

          return lastPage.nextOffset >= MAX_POKEMON ? undefined : lastPage.nextOffset / FETCH_LIMIT
        }
      }
    );

  const handleScroll = (event) => {
    console.count(`handleScroll`);

    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - (scrollTop + clientHeight) < 200 && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (data) {
      // console.error(`🪵~🧮~🪵~🧮~🪵~🧮~🪵~🧮~🪵~🧮~🪵~🧮~🪵
      //   data =>
      //   ${data}
      // `);

      // const pokemonList = data.pages.flatMap((page) => page.pokemon);
      // const pokemonList = data.pages.map((page) => page.pokemon);
      const pokemonList = _.flatMap( data.pages,
        page => page.pokemon
      );

      addPokemons(pokemonList);

      console.log( `useEffect pokemons`, JSON.stringify(pokemons, undefined, 2) );
    }
  }, [ data, pokemons, addPokemons ]);

  const btnClasses = btnType => {
    switch ( btnType ) {
      case 'info':
        return 'button is-info';
      case 'load':
        return `button ${ isLoading ? ' is-loading' : '' }`;
      case 'danger':
        return 'button is-danger';
      case 'success':
        return 'button is-success';
      default:
        return 'button';
      }
  }

  // function currentPage() {
  //   let pokemonId;
  //   const x = data.pages.map((page, index) =>
  //     _.map( page, pg => pg.pokemon.name)
  //   )

  //   // const p = _.get(data, "pages[0].pokemon");

  //   // const current = _.map( _.get(data, "pages[0].pokemon"), p => {
  //   //   p
  //   // });

  //   // console.error(`🪵~🧮~🪵~🧮~🪵~🧮~🪵~🧮~🪵~🧮~🪵~🧮~🪵
  //   //   p.name =>
  //   //   ${p.name}
  //   // `);

  //   // console.error("currentPokes current", current);
  //   // return current;

  //   // return _.map( data.pages, (page, index) => {
  //   //   _.head( page )
  //   // })
  // }

  // function getPokemonId( name, url ) {
  //   const ts = _.trimStart( url, BASE_URL );
  //   const id = _.nth( _.split( url, "/"), -2);

  //   console.log( `getPokemonId name => ${name}` );
  //   console.log( `getPokemonId url => ${url}` );

  //   console.log( `id => ${id}` );
  // }

  function parsePokeData( pokeData ) {
    const parsed = _.flattenDeep(
      _.map( pokeData.pages, page =>
        _.map( page.pokemon, pokemon => ({
          name: _.capitalize( pokemon.name ),
          url: pokemon.url,
          id: _.nth( _.split( pokemon.url, "/"), -2 ),
          // id: getPokemonId( pokemon.name, pokemon.url ),
        })
      ))
    )

    // const parsed = pokeData.pages.map(( page, index ) =>
    //     page.pokemon.map( pokemon => ({
    //         idx: index,
    //         name: pokemon.name,
    //         url: pokemon.url
    //         // { ...getPokemonDetails(pokemon.url) }
    //       })
    //     )
    //   );

        // console.log(`parsed`, JSON.stringify(parsed, undefined, 2));
      return parsed;



    // const pokemonDetails = d.pages.map((page, index) => (
    //   <li key={index}>
    //     {page.pokemon.map((pokemon) => (
    //       <div key={pokemon.name}>

    //         <img
    //           // src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
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
  }

  function resetList() {
    console.log(`resetList =>`);
  }

  if (error) return <div>Error fetching Pokemon data</div>;
  if (!data) return <div>Loading...</div>;

  // return (
  //   <InfiniteScroll onScroll={handleInfiniteScroll}>
  //     {pokemons.map((pokemon) => (
  //       <Pokemon key={pokemon.id} data={pokemon} />
  //     ))}
  //   </InfiniteScroll>
  // );

  return (
    <div className="pokedex">
      <h1>POKEDEX</h1>

      <div className="pd-body container">

        <div className="buttons">
          <a
            className={ btnClasses( 'info' )}
            onClick={parsePokeData( data )}>
            { data ? "LOAD" : "NO DATA" }
          </a>
          <a
            className={ btnClasses( 'load' )}
            onClick={parsePokeData( data )}>
            { data ? "LOAD" : "NO DATA" }
          </a>
          <a
            className={ btnClasses( 'danger' )}
            onClick={resetList()}>
            RESET LIST
          </a>
        </div>


        <div
          className="pd-screen"
          onScroll={handleScroll}
        >
          <List pokeArray={ parsePokeData( data ) }/>
        </div>

      </div>
      {isFetchingNextPage && <div>Loading more Pokemon...</div>}
    </div>
  );
}

export default Pokedex
