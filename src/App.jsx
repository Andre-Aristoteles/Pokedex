import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import { ArrowsVertical } from "@phosphor-icons/react";

async function getPokemon(count) {

  const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=' + count
  const res = await fetch(url)
  const pokemons = await res.json()
  const pokeData = await Promise.all(pokemons.results.map(async (pokemon) => {
    const res = await fetch(pokemon.url)
    const data = await res.json()
    return {...pokemon, ...data}
  }))

  return pokeData
  
}

function App() {
  const [pokemons, setPokemons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(8)
  
  useEffect(() => {
    async function main() {
      const pokemons = await getPokemon(8)
      setPokemons(pokemons)
    }
    main()
  }, [])

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = pokemons.slice(firstPostIndex, lastPostIndex)

  console.log(pokemons)
  return (
    <>

      <div className="card-container">
        {currentPost.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

    </>
  )
}

export default App