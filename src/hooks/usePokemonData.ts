import {useInfiniteQuery} from "@tanstack/react-query"
import {
  capitalize,
  get,
  map,
  omit,
  pick,
  sortBy
} from 'lodash-es'


const BASE_FETCH_URL = "https://pokeapi.co/api/v2/pokemon";

const usePokemonData = ( fetchLimit ) => {
  const fetchPageData = async ( pageNo: number ) => {
    const
      offset = pageNo * fetchLimit,
      limit = fetchLimit,
      fetchUrl = `${BASE_FETCH_URL}?offset=${offset}&limit=${limit}`;

    const response = await fetch( fetchUrl );
    if ( !response.ok ) {
      debugger;
      throw new Error( "Failed to fetch Pokemon page #" + pageNo );
    }
    const pageData = await response.json();

    return omit( pageData, [ 'count', 'previous' ] )
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
    const pokeInfo = pick(
      fetchedPokeData,
      [ 'id', 'name', 'types', 'sprites' ]
    );

    const formatPokemonTypes = ( pokeTypes ) => {
      if ( !pokeTypes ) return [];
      // ensure the pokemon's primary type is always displayed first
      const sortedTypes = pokeTypes.length > 1
        ? sortBy( pokeTypes, [ 'slot' ] )
        : pokeTypes;

      return map( sortedTypes, type => get( type, 'type.name' ) );
    }

    const spritePath1 = 'sprites.other.dream_world.front_default',
      spritePath2 = 'sprites.other.home.front_default',
      spritePath3 = 'sprites.front_default';

    return {
      name: pokeInfo.name,
      id: pokeInfo.id,
      imageUrl: (
        get( pokeInfo, spritePath1 )
        || get( pokeInfo, spritePath2 )
        || get( pokeInfo, spritePath3 )
      ),
      additionalInfo: {
        types: formatPokemonTypes( pokeInfo.types || null )
      }
    };
  }

  const fetchPokemonData = async ({ pageParam = 0 }) => {
    const pageData = await fetchPageData( pageParam );
    const {results: pagePokes} = pageData;
    const updatedPokeResults = await Promise.all( map( pagePokes, fetchPokeDetails ));
    const updatedPageData = {...pageData, results: updatedPokeResults};

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
    queryKey: [ 'pokemonData' ],
    queryFn: fetchPokemonData,
    getNextPageParam: ( lastPage, pages ) =>
      lastPage[ 'next' ] !== null
        ? pages.length
        : undefined,
    onError: err => {
      console.error( "🚀🚀🚀 ~ usePokemonData ~ onError - err:", err );
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
