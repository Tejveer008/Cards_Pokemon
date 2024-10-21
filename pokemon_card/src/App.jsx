import { useEffect } from "react";

export const App = () => {

  const API = "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const detailPokemonData = data.results.map(async (curPoke) => {
        // console.log(curPoke.url);

        // const res = await fetch(curPoke.url);
        // const data = await res.json();
        console.log(curPoke.url);
      });

    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
  return (
    <>
      <h1>Hello</h1>
    </>
  )
};
export default App;