import React from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import query from 'graphql-tag';

const GET_POKEMON_INFO = query`
  {
    pokemon(first: 150) {
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
  }`

export default function App() {

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log('query:', query);
    console.log(error);
    return <p>Error</p>;
  }

  return (
    <>
      <h1>Pokémon</h1>
      {JSON.stringify(data)}
      <p>
        Pokémon have been around for as long as humans can remember. While new species
        are being discovered each year, this is the original group of Pokémon. There 
        were 150 in total back then. Now the number of known species has grown into the
        800s. As humans continue to explore the world, there's no telling how many more
        Pokémon will be discovered.
      </p>
      <div className="container">
        {data && data.pokemon && data.pokemon.map((p, i) => (
            <div key={i} className="card">
              <img src={p.image} alt={p.name} />
              <div class="card-body">
                <h3>{p.name}</h3>
                <p>
                  {p.evolutions && p.evolutions.length !== 0 && (
                    <p>
                      Evolutions:
                      {p.evolutions.map((e, j) => {
                        return <p key={j}> {e.name} </p>;
                      })}
                    </p>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}