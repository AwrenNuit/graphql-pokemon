import React from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_POKEMON_INFO = gql`
  {
    pokemon(name: "Pikachu") {
      id
      number
      name,
      image,
      evolutions {
        id,
        number,
        name,
        image
      }
    }
  }`;

export default function App() {

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const p = data.pokemon;

  return (
    <>
      <h1>Pokémon</h1>
      <p>
        Pokémon have been around for as long as humans can remember. While new species
        are being discovered each year, the original group of Pokémon remain legendary. 
        There were 150 in total back then. Of those 150 Pikachu was the most famous. 
        Now the number of known species has grown into the 800s. As humans continue to 
        explore the world, there's no telling how many more Pokémon will be discovered.
      </p>
      <div className="container">
        <div className="card">
          <img src={p.image} alt={p.name} />
          <div className="card-body">
            <h3>{p.name}</h3>
            <div>
              {p.evolutions && p.evolutions.length !== 0 && (
                <div style={{display:"inline"}}>
                  Evolutions:
                  {p.evolutions.map((e, i) => {
                    return <div style={{display:"inline"}} key={i}> {e.name} </div>;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}