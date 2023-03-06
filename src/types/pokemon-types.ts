interface PageResp {
  results: PokeResp[];
  next: string | null;
  prev?: string | null;
  count?: number;
}
interface PokeResp {
  name: string;
  url: string;
}

interface PokeTypeSlot {
  slot: number;
  type: {
    name: PokeType,
    url: string
  };
}

interface PokeInfo {
  name: string;
  id: number;
  imageUrl: string;
  additionalInfo: {
    types: PokeType[];
  };
}

interface PokeData {
  status: string;
  error: Error | undefined | unknown;
  pokemonData: PokeInfo[];
  pokemonCount: number;
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

type PokeType = {
  grass: string,
  poison: string,
  fire: string,
  water: string,
  electric: string,
  ground: string,
  flying: string,
  normal: string,
  fighting: string,
  bug: string,
  ice: string,
  rock: string,
  dark: string,
  psychic: string,
  ghost: string,
  fairy: string,
  dragon: string,
  steel: string,
}

export {
  PageResp,
  PokeResp,
  PokeTypeSlot,
  PokeInfo,
  PokeData,
  PokeType
}