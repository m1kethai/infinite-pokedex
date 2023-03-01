import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Pokedex from '~/Pokedex/Pokedex.jsx'

import './base-styles.scss'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 sec. fetch buffer
      staleTime: 5000,
      refetchOnWindowFocus: false
    }
  }
})

// Clear all Pokemon data from react-query cache
function clear() {
  queryClient.clear();
}

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <Pokedex clearCache={ clear } />
      <ReactQueryDevtools initialIsOpen/>
    </QueryClientProvider>
  )
}

export default App
