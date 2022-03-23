import React, { useEffect } from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCell } from '../../store/actions/moves';
import { resetBoard } from '../../store/actions/reset';
import { isWinner } from '../../utils/isWinner';
import { setWinner } from '../../store/actions/winner';

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

export const Board = () => {
  const board = useSelector(selectBoard)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  useEffect(() => {
    if(isWinner(board)) {
      dispatch(setWinner(game.currentPlayer === 'X'? 'O':'X'))
    }
  }, [board, dispatch, game.currentPlayer]);

  const onCellSelect = (value, rowIndex, columnIndex) => {
    if(!value && !game.winner) dispatch(selectCell(
      game.currentPlayer,
      rowIndex,
      columnIndex
    ))
  }

  const onResetBoard = () => {
    dispatch(resetBoard())
  }

  return (
    <div className="Board">
      <div className="Player">
        {game.winner? `Winner Player ${game.winner}` : `Player ${game.currentPlayer}`}
      </div>
      <div className="game-board">
        {board.map((rows, rowIndex) => {
          return rows.map((value, columnIndex) => (
            <div
              aria-label="board-cell"
              key={columnIndex}
              className="board-cell"
              onClick={() => onCellSelect(value, rowIndex, columnIndex)}
            >
              {value}
            </div>
          ))
        })}
      </div>
      <div aria-label="restart-game-button" className='restart-game' onClick={onResetBoard}>
        Restart Game
      </div>
    </div>
  )
}
