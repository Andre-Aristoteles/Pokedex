import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'

const PAGE_SIZE = 72;

async function getPokemon({page, pageSize}) {

  const url = `https://pokeapi.co/api/v2/pokemon?offset=${page * pageSize}&limit=${pageSize}` 
  const res = await fetch(url)
  const data = await res.json()
  
  const pageResult = await Promise.all(data.results.map(async (pokemon) => {
    const res = await fetch(pokemon.url)
    const data = await res.json()
    return {...pokemon, ...data}
  }))

  return {pageResult, totalPages: Math.ceil(data.count / pageSize), totalCount: data.count}
  
}

function App() {
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    async function main() {
      setIsLoading(true)
      const data = await getPokemon({page: currentPage, pageSize: PAGE_SIZE})
      setData(data)
      setIsLoading(false)
    }
    main()
  }, [currentPage])

  return (
    <>
      {isLoading && (
        <img src="/simple_pokeball.gif" alt="Carregando..." id='gif'/>
      )}

      {!isLoading && (
        <>
          <div className="card-container">
            {data.pageResult.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          <footer>
            {Array.from({ length: data.totalPages }).map((_, index) => (
              <button   
                key={index} 
                type='button' 
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            ))}
          </footer>
        </>
      )}
      
    </>
  )
}

export default App