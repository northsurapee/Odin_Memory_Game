import { useState, useEffect } from "react";
import pokeAPI from "./assets/pokeAPI.png";
import "./style/App.css";
import ScoreBoard from "./component/scoreBoard";
import Card from "./component/card";
import Modal from "./component/modal";

function App() {
  const [score, setScore] = useState(0);
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [pokemonSelected, setPokemonSelected] = useState([]);
  const [isGameOver, setGameOver] = useState(0); // 0:playing, 1:win, 2:lose
  const [playAgain, setPlayAgain] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Execute side effect
    async function getRandomPokemon() {
      try {
        setLoading(true); // Use setLoading(true) directly instead of using a function
        const randomPokemonIds = Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 1024) + 1,
        );
        const requests = randomPokemonIds.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { mode: "cors" }),
        );
        const responses = await Promise.all(requests);
        const pokemonData = await Promise.all(
          responses.map((response) => response.json()),
        );

        const pokemonInfo = pokemonData.map((data, index) => ({
          name: data.forms[0].name,
          url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonIds[index]}.png`,
        }));

        console.log(pokemonInfo);
        setPokemonInfo(pokemonInfo);
        setLoading(false); // Use setLoading(false) directly instead of using a function
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }

    getRandomPokemon();

    // Return cleanup function
    return () => {
      setPokemonInfo([]);
      setLoading(false); // Reset loading state
    };
  }, [playAgain]); // The empty dependency array ensures that this effect runs once after the initial render

  function handleSelectPokemon(pokemonName) {
    console.log(pokemonSelected);
    if (pokemonSelected.includes(pokemonName)) {
      setGameOver(2); // lose
    } else {
      // playing
      const newPokemonSelected = [...pokemonSelected];
      newPokemonSelected.push(pokemonName);
      setPokemonSelected(newPokemonSelected);
      setScore(score + 1);
      if (score + 1 === 5) setGameOver(1); // win
      // shuffle
      setPokemonInfo(shuffleArray(pokemonInfo));
    }
  }

  function shuffleArray(pokemonInfo) {
    const array = [...pokemonInfo];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handlePlayAgain() {
    setScore(0); // ScoreBoard = 0/5
    setPokemonSelected([]); // Clear pokemonSelected list
    setGameOver(0); // Change to playing
    setPlayAgain(!playAgain); // toggle playAgain
  }

  return (
    <div className="app">
      <img src={pokeAPI} alt="pokeAPI" />
      <p className="instruction">
        Get points by clicking on a pokemon but do not click on any more than
        once!
      </p>
      <ScoreBoard Score={score} />
      <div className={`loading-screen ${isLoading ? "show" : ""}`}>
        Loading...
      </div>
      <div className={`card-container ${!isLoading ? "show" : ""}`}>
        {pokemonInfo.map((data) => (
          <Card
            key={data.name}
            pokemonName={data.name}
            pokemonURL={data.url}
            selectPokemon={handleSelectPokemon}
          />
        ))}
      </div>
      {isGameOver !== 0 && (
        <Modal isGameOver={isGameOver} onClick={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;
