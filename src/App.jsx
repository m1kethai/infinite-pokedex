import { useState } from 'react'

//* Components
import Pokedex from '@/Pokedex'

//* Assets
// import pokeLogo from './assets/pokeLogo.svg'

//* Root Styles
import './main.scss'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

      <div className="logo">
        asdf
      </div>

      <div className="pokedex-wrapper">
        <Pokedex
        >

        </Pokedex>
      </div>
    </div>
  )
}

export default App
