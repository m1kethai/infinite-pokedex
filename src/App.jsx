import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Pokedex from '~/Pokedex/Pokedex.jsx'

import './base-styles.scss'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 sec. fetch buffer for dedupe
      staleTime: 5000,
      refetchOnWindowFocus: false
    }
  }
})

// resets all Pokemon data
function clear() {
  queryClient.clear();
}

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <div className="logo">
        welcome to pokedex infinity
      </div>
      <Pokedex clearCache={ clear } />
      <ReactQueryDevtools initialIsOpen/>
    </QueryClientProvider>
  )
}

export default App
