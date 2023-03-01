import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Pokedex from './components/Pokedex/Pokedex.jsx'
import './base-styles.scss'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000
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
