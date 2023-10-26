import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import { ArrowsVertical } from "@phosphor-icons/react";

function App() {
  const [pokemons, setPokemons] = useState([])
  
  async function getPokemon(count) {

    const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=' + count
    const res = await fetch(url)
    const pokemons = await res.json()
    const pokeData = await Promise.all(pokemons.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return {...pokemon, ...data}

      
    }))

    setPokemons(pokeData)

    return pokemons
    
  }
  useEffect(() => {

    getPokemon(5000)
  }, [])

  console.log(pokemons)
  return (
    <>

      <div className="card-container">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

    </>
  )
}

export default App
