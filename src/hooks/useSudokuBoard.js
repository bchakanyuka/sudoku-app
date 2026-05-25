import { useState, useMemo, useEffect, useRef } from 'react';

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isValid(board, row, col, num) {
  for (let c = 0; c < 9; c++) if (board[row][c] === num) return false;
  for (let r = 0; r < 9; r++) if (board[r][col] === num) return false;
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++)
    for (let c = bc; c < bc + 3; c++)
      if (board[r][c] === num) return false;
  return true;
}

function fillBoard(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const n of nums) {
          if (isValid(board, r, c, n)) {
            board[r][c] = n;
            if (fillBoard(board)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateSolved() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  return board;
}

function makePuzzle(solved, clues) {
  const puzzle = solved.map(row => [...row]);
  const cells = shuffle(Array.from({ length: 81 }, (_, i) => i));
  let removed = 0;
  for (const idx of cells) {
    if (removed >= 81 - clues) break;
    const r = Math.floor(idx / 9);
    const c = idx % 9;
    puzzle[r][c] = 0;
    removed++;
  }
  return puzzle;
}

const DIFFICULTIES = {easy: 54, medium: 46, hard: 36};

function useSudokuBoard() {
  const [difficulty, setDifficulty] = useState('medium')
  
  const initialSolved = useMemo(() => generateSolved(), [])
  const initialPuzzle = useMemo(() => makePuzzle(initialSolved, DIFFICULTIES['medium']), [initialSolved])

  const [solved, setSolved] = useState(initialSolved)
  const [puzzle, setPuzzle] = useState(initialPuzzle)
  const [board, setBoard] = useState(() => initialPuzzle.map(row => [...row]))
  const [selectedCell, setSelectedCell] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [timer, setTimer] = useState(0)
  const isFirstRender = useRef(true);

useEffect(() => {
  if(isFirstRender.current){
    isFirstRender.current = false;
    return;
  }
  newGame();
}, [difficulty]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function placeNumber(num) {
    if (!selectedCell) return
    const [row, col] = selectedCell
    if (puzzle[row][col] !== 0) return
    const newBoard = board.map(r => [...r])
    newBoard[row][col] = num
    if (num !== solved[row][col]) {
      setMistakes(m => m + 1)
    }
    setBoard(newBoard)
  }

  function eraseCell(){
  if(!selectedCell) return
  const [row,col] = selectedCell
  if (puzzle[row][col] !== 0) return
  const newBoard = board.map(r => [...r])
  newBoard[row][col] = 0
  setBoard(newBoard)
}

  function newGame() {
    const newSolved = generateSolved()
    const newPuzzle = makePuzzle(newSolved, DIFFICULTIES[difficulty])
    setSolved(newSolved)
    setPuzzle(newPuzzle)
    setBoard(newPuzzle.map(row => [...row]))
    setSelectedCell(null)
    setMistakes(0)
    setTimer(0)
  }

  const isWon = board.every((row, r) =>
    row.every((val, c) => val === solved[r][c])
  )

  return { board, puzzle, solved, selectedCell, setSelectedCell, mistakes, placeNumber, timer, isWon, newGame, difficulty, setDifficulty, eraseCell }
}

export default useSudokuBoard

