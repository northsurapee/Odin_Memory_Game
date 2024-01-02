/* eslint-disable react/prop-types */
import "../style/modal.css";

export default function Modal({ isGameOver, onClick }) {
  return (
    <>
      <div className="backdrop"></div>
      <div className="modal">
        <h2>
          {isGameOver === 1 ? "You Win" : ""}
          {isGameOver === 2 ? "You Lose" : ""}
        </h2>
        <button onClick={onClick}>Play Again</button>
      </div>
    </>
  );
}
