export default function newGameRules (newGameDifficulty, localStorage, currentState) {
  let difficulty;
  let initialColumn;

  if (newGameDifficulty !== undefined && localStorage) {
    localStorage.setItem('storedDifficulty', newGameDifficulty);
    difficulty = newGameDifficulty;
  } else if (localStorage) {
    difficulty = localStorage.getItem('storedDifficulty');
  } else {
    difficulty = newGameDifficulty;
  }

  let numberOfDiscs = (parseInt(difficulty) + 2) * 3 + 8;

  if (!currentState) {
    initialColumn = Array.from(Array(numberOfDiscs).keys());
  } else {
    initialColumn = currentState.columns[0];
  }
  return initialColumn;
}
