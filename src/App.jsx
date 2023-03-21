import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Pokedex from './components/Pokedex/Pokedex.jsx'
import Header from './components/Header/Header.jsx'

import './app.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * (60 * 1000)
    }
  }
})

//! clear all Pokemon data from react-query cache
function clear() {
  queryClient.clear();
}

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <Header/>
      <Pokedex clearCache={ clear }/>
      <ReactQueryDevtools initialIsOpen={ false }/>
    </QueryClientProvider>
  )
}

export default App
