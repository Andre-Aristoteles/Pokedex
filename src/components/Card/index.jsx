import React from 'react'
import './styles.css'
import { ArrowsVertical, Barbell, Heart, Sword, Shield, Fire, SneakerMove, ShieldStar } from "@phosphor-icons/react";
import { useState } from 'react';

export default function Card({ pokemon }) {
  const [image, setImage] = useState(pokemon.sprites.front_default)

  const handleMouseEnter = () => {
    setImage(pokemon.sprites.front_shiny)
  }

  const handleMouseLeave = () => {
    setImage(pokemon.sprites.front_default)
  }
  
  return (
    <div className={'card'} >
      <div 
        className="card-header" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{background: `var(--${pokemon.types[0].type.name})`}}
      >
        <h1>{pokemon.name}</h1>
        <img src={image} alt={pokemon.name} />
      </div>
      
      
      

      <div className='type-text'>
        <p style={{background: `var(--${pokemon.types[0]?.type.name})`}}>{pokemon.types[0].type.name}</p>
        <p style={{background: `var(--${pokemon.types[1]?.type.name})`}}>{pokemon.types[1]?.type.name}</p>
      </div>

      <div className="desc">

        <div className='container'>
          <p><ArrowsVertical size={15} /> Altura</p>
          <p className='data'>{pokemon.height/10}m</p>
        </div>

        <div className='container'>
          <p><Barbell size={15} /> Peso</p>
          <p className='data'>{pokemon.weight/10}kg</p>
        </div>

      </div>
      <div className="stats">
            <div className="container">

              <p style={{color: 'red'}}><Heart size={20} />{pokemon.stats[0].stat.name}</p>
              <p style={{color: 'red'}} className='stat-value'>{pokemon.stats[0].base_stat}</p>  
              
            </div>
          <div className="container">

            <p style={{color: 'black'}}><Sword size={20} />{pokemon.stats[1].stat.name}</p>
            <p style={{color: 'black'}} className='stat-value'>{pokemon.stats[1].base_stat}</p>  
            
          </div>
          <div className="container">

            <p style={{color: 'gray '}}><Shield size={20} />{pokemon.stats[2].stat.name}</p>
            <p style={{color: 'gray '}} className='stat-value'>{pokemon.stats[2].base_stat}</p>  
            
          </div>
          <div className="container">

            <p style={{color: 'orange'}}><Fire size={20} />{pokemon.stats[3].stat.name}</p>
            <p style={{color: 'orange'}} className='stat-value'>{pokemon.stats[3].base_stat}</p>  
            
          </div>
          <div className="container">

            <p style={{color: '#C5B78C'}}><ShieldStar size={20} />{pokemon.stats[4].stat.name}</p>
            <p style={{color: '#C5B78C'}} className='stat-value'>{pokemon.stats[4].base_stat}</p>  
            
          </div>
          <div className="container">

            <p style={{color: 'blue'}}><SneakerMove size={20} />{pokemon.stats[5].stat.name}</p>
            <p style={{color: 'blue'}} className='stat-value'>{pokemon.stats[5].base_stat}</p>  
            
          </div>
      </div>
      
    </div>
  )
}
