'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @next/next/no-img-element */


import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "@/component/footer";
import Header from "@/component/Header";

interface PokemonType {
  name: string;
}

interface Pokemon {
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  types: { type: PokemonType }[];
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Paginate the data
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPokemons = async (page: number) => {
    try {
      setLoading(true);
      const limit = 20; // Limit the number of Pokémon per request
      const offset = (page - 1) * limit;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const results = response.data.results;
      
      // Fetch additional data for each Pokémon
      const promises = results.map((pokemon: { url: string }) => axios.get(pokemon.url));
      const pokemonData = await Promise.all(promises);
      setPokemons((prevPokemons) => [...prevPokemons, ...pokemonData.map((response) => response.data)]);
      
      setHasMore(response.data.next !== null); // Check if there is more data to load
      setLoading(false);
    } catch (err) {
      // Improved error handling
      if (err instanceof Error) {
        setError(err.message); // Type-safe access to error message
      } else {
        setError('Erreur de chargement des données');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page]); // Trigger data fetch when page changes

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Header />
      <h1>Pokémons (1 à 1025)</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem',
        }}
      >
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ maxWidth: '100px', height: 'auto' }}
            />
            <h3>{pokemon.name}</h3>
            <p>Poids: {pokemon.weight}</p>
            <p>Taille: {pokemon.height}</p>
            <h4>Types</h4>
            <ul>
              {pokemon.types.map((type, typeIndex) => (
                <li key={typeIndex}>{type.type.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {hasMore && !loading && (
        <button
          onClick={() => setPage(page + 1)}
          style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white' }}
        >
          Charger plus
        </button>
      )}
      <Footer />
    </div>
  );
}
