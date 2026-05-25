import useSudokuBoard from "../hooks/useSudokuBoard";
import Board from "./Board";
import Numpad from "./Numpad";
import GameControls from "./GameControls";
import {GameContext} from "../context/GameContext";

function Game(){
    const game = useSudokuBoard();
    const {mistakes, timer, isWon} = game;

    const minutes = Math.floor(timer / 60);
    const seconds = String(timer % 60).padStart(2, '0');

    return (
        <GameContext.Provider value={game}>
        <div className="game-container">
            <h1>Sudoku</h1>
            <GameControls />
            <div className="status-bar">
            <div>Mistakes: <span className={mistakes > 0 ? 'mistakes-warning' : ''}>{mistakes}</span></div>            {isWon && <p>You won!</p>}
            <div>Time: <span>{minutes}:{seconds}</span></div>
            </div>
            <Board />
            <Numpad />
            
        </div>
        </GameContext.Provider>
    );
}

export default Game;