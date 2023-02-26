import { useInfiniteQuery } from "@tanstack/react-query";

const MAX_FETCH_LIMIT = 30;
const FETCH_OFFSET = 30;

const usePokemonData = () => {
  const fetchPokemonPage = (page = 0) => {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${MAX_FETCH_LIMIT}&offset=${
        page * FETCH_OFFSET
      }`
    ).then((res) => res.json());
  };

  const fetchPagePokemonDetails = (url) => {
    return fetch(url).then((res) => res.json());
  };

  const buildPokeItems = (pages) => {
    const pokemonData = {};
    let totalPagesFetched = 0;

    pages.forEach((page) => {
      if (page.status === "fulfilled") {
        const { results } = page.value;
        const pageData = {};
        results.forEach(async (result) => {
          const pokemonDetails = await fetchPagePokemonDetails(result.url);
          const {
            name,
            id,
            types,
            sprites: { other },
            url,
          } = pokemonDetails;
          const imageUrl = other["official-artwork"].front_default;

          pageData[id] = {
            name,
            id,
            type: types[0].type.name,
            url,
            imageUrl,
          };
        });

        pokemonData[`page-${totalPagesFetched}`] = pageData;
        totalPagesFetched++;
      }
    });

    return { totalPagesFetched, pokemonData };
  };

  const { isLoading, data, fetchNextPage } = useInfiniteQuery(
    "pokemonData",
    ({ pageParam = 0 }) => fetchPokemonPage(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { next } = lastPage;
        return next ? lastPage.results.length / MAX_FETCH_LIMIT : undefined;
      },
      keepPreviousData: true,
    }
  );

  const pokemonData = buildPokeItems(data.pages);

  return { isLoading, totalPagesFetched: pokemonData.totalPagesFetched, pokemonData, fetchNextPage };
};

export default usePokemonData;
