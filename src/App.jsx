import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import Pokedex from './components/Pokedex/Pokedex.jsx'
import './root-styles.scss'
import './components/Pokedex/pokedex.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * (60 * 1000)
    }
  }
})

// Clear all Pokemon data from react-query cache (for testing)
function clear() {
  queryClient.clear();
}

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <Pokedex clearCache={ clear }/>
      {/* <ReactQueryDevtools initialIsOpen={ false }/> */}
    </QueryClientProvider>
  )
}

export default App
