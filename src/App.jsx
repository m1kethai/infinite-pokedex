import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Pokedex from '@/Pokedex/Pokedex.jsx'
import './base-styles.scss'


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="logo"></div>
      <div className="pokedex-wrapper">
        <Pokedex/>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default App
