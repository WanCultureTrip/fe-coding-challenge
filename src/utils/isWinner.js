const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export const isWinner = (board) => {
  const oneDboard = [].concat(...board);
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      const a = oneDboard[winCondition[0]];
      const b = oneDboard[winCondition[1]];
      const c = oneDboard[winCondition[2]];
      if (a === null || b === null || c === null) {
          continue;
      }
      if (a === b && b === c) {
          roundWon = true;
          break;
      }
  }

  return roundWon
}