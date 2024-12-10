'use client';

import { useEffect, useState } from "react";
import axios from "axios";

// Définir le type des données Pokémon
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
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); // tableau pour stocker les 151 Pokémon
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 151; i++) {
          promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }
        const results = await Promise.all(promises);
        const pokemonData = results.map((response) => response.data);
        setPokemons(pokemonData);
        setLoading(false);
      } catch (err) {
        setError("Erreur de chargement des données");
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Pokémons (1 à 151)</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
        {pokemons.map((pokemon, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
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
    </div>
  );
}
