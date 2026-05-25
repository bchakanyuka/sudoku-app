import {useGame} from "../context/GameContext";
import Cell from "./Cell";

function Board() {
    const {board, puzzle, solved, selectedCell, setSelectedCell} = useGame();
    
    const selectedValue = selectedCell ? board[selectedCell[0]][selectedCell[1]] : null;
    
    function isPeer(row, col){
        if (!selectedCell) return false;
        const [sr, sc] = selectedCell;
        return (
            row === sr || col === sc || (Math.floor(row / 3) === Math.floor(sr / 3) && Math.floor(col / 3) === Math.floor(sc / 3)))

        }
    
    return(
        <div className="board">
            {board.map((row, rowIndex) =>
                row.map((value, colIndex) => 
                    <Cell
                        key={`${rowIndex}-${colIndex}`}
                        value={value}
                        row={rowIndex}
                        col={colIndex}
                        isSelected={selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex}
                        isPeer={isPeer(rowIndex, colIndex)}
                        isGiven={puzzle[rowIndex][colIndex] !== 0}
                        isError={value !== 0 && value !== solved[rowIndex][colIndex]}
                        isMatch={selectedValue !== 0 && selectedValue !== null && value === selectedValue}
                        onClick ={() => setSelectedCell([rowIndex, colIndex])}
                    />
                )
            )}
        </div>
    )
}

export default Board;