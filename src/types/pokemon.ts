interface PageResponse {
  count: number;
  next: string;
  previous?: any;
  results: PagePokeResult[];
}

interface PagePokeResult {
  name: string;
  url: string;
}

export {
  PageResponse,
  PagePokeResult
}