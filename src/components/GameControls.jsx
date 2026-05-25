import {useGame} from "../context/GameContext";

function GameControls(){
    const {newGame, difficulty, setDifficulty} = useGame();

    return (
        <div className="controls">
            <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button onClick={newGame}>New Game</button>
        </div>
    )
}

export default GameControls;