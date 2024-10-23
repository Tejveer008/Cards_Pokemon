import { useState } from "react";
import { useEffect } from "react";
import { PokemonCards } from "./PokemonCards";
export const App = () => {

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const detailedPokemonData = data.results.map(async (curPoke) => {
        const res = await fetch(curPoke.url);
        const data = await res.json();
        console.log(data);
        return data;
      });
      // console.log(detailedPokemonData);

      const detailedResponses = await Promise.all(detailedPokemonData);
      // console.log(detailedResponses);

      setPokemon(detailedResponses);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);

    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) {
    return <div>
      <h1>Loading....</h1>
    </div>
  }


  if (error) {
    return <div>
      <h1>{error.message}</h1>
    </div>
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets catch Pokemon</h1>
        </header>
        <div>
          <ul className="cards">
            {
              pokemon.map((curPoke) => {
                return <PokemonCards key={curPoke.id} pokemonData={curPoke} />
              })
            }
          </ul>
        </div>
      </section>
    </>
  )
};
export default App;