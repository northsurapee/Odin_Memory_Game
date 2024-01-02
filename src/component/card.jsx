/* eslint-disable react/prop-types */
import "../style/card.css";

export default function Card({ pokemonName, pokemonURL, selectPokemon }) {
  function handleOnClick() {
    selectPokemon(pokemonName);
  }

  return (
    <div className="card" onClick={handleOnClick}>
      <img src={pokemonURL} alt="pokemon" />
      <h3 className="pokemon-name">{pokemonName}</h3>
    </div>
  );
}
