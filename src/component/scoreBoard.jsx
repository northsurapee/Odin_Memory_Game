/* eslint-disable react/prop-types */
import "../style/scoreBoard.css";

export default function ScoreBoard({ Score }) {
  return (
    <div className="score-container">
      <h2 id="current-score">SCORE : {Score} / 5</h2>
    </div>
  );
}
