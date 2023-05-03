
import React, { useState } from 'react';
import './hangman.css';

const MAX_GUESSES = 6;
const WORDS = ['apple', 'banana', 'cherry', 'grape', 'lemon', 'melon', 'orange', 'peach', 'pear', 'plum'];

function Hangman() {
  const [word, setWord] = useState(pickWord());
  const [guesses, setGuesses] = useState(new Set());
  const [guess, setGuess] = useState('');
  const [numWrongGuesses, setNumWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function pickWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  function handleGuess(e) {
    e.preventDefault();
    if (guesses.has(guess) || numWrongGuesses >= MAX_GUESSES || gameOver) {
      return;
    }
    setGuesses(new Set([...guesses, guess]));
    if (!word.includes(guess)) {
      setNumWrongGuesses(numWrongGuesses + 1);
      if (numWrongGuesses + 1 === MAX_GUESSES) {
        setGameOver(true);
      }
    }
    setGuess('');
  }

  function getMaskedWord() {
    return word.split('').map((letter) => (guesses.has(letter) ? letter : '_')).join(' ');
  }

  function getWrongGuesses() {
    return Array.from(guesses).filter((letter) => !word.includes(letter)).join(' ');
  }

  function restartGame() {
    setWord(pickWord());
    setGuesses(new Set());
    setGuess('');
    setNumWrongGuesses(0);
    setGameOver(false);
  }

  return (
    <div className="Hangman">
      <h1>Hangman</h1>
      {gameOver ? (
        <div className="Hangman-game-over-message">Game Over! The word was "{word}".</div>
      ) : (
        <>
          <div className="Hangman-word">{getMaskedWord()}</div>
          <div className="Hangman-wrong-guesses">{getWrongGuesses()}</div>
          <form className="Hangman-form" onSubmit={handleGuess}>
            <input
              type="text"
              value={guess}
              maxLength="1"
              onChange={(e) => setGuess(e.target.value.toLowerCase())}
              disabled={numWrongGuesses >= MAX_GUESSES || gameOver}
            />
            <button className= "Hangman-guess-button" type="submit" disabled={numWrongGuesses >= MAX_GUESSES || gameOver}>
              Guess
            </button>
          </form>
          <div className="Hangman-guesses-remaining">
            Guesses remaining: {MAX_GUESSES - numWrongGuesses}
          </div>
        </>
      )}
      <button className="Hangman-restart-button" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}

export default Hangman;

// import React, { useState } from 'react';
// import './hangman.css';

// const MAX_GUESSES = 6;
// const WORDS = ['apple', 'banana', 'cherry', 'grape', 'lemon', 'melon', 'orange', 'peach', 'pear', 'plum'];

// function Hangman() {
//   const [word, setWord] = useState(pickWord());
//   const [guesses, setGuesses] = useState(new Set());
//   const [guess, setGuess] = useState('');
//   const [numWrongGuesses, setNumWrongGuesses] = useState(0);

//   function pickWord() {
//     return WORDS[Math.floor(Math.random() * WORDS.length)];
//   }

//   function handleGuess(e) {
//     e.preventDefault();
//     if (guesses.has(guess) || numWrongGuesses >= MAX_GUESSES) {
//       return;
//     }
//     setGuesses(new Set([...guesses, guess]));
//     if (!word.includes(guess)) {
//       setNumWrongGuesses(numWrongGuesses + 1);
//     }
//     setGuess('');
//   }

//   function getMaskedWord() {
//     return word.split('').map((letter) => (guesses.has(letter) ? letter : '_')).join(' ');
//   }

//   function getWrongGuesses() {
//     return Array.from(guesses).filter((letter) => !word.includes(letter)).join(' ');
//   }

//   function restartGame() {
//     setWord(pickWord());
//     setGuesses(new Set());
//     setGuess('');
//     setNumWrongGuesses(0);
//   }

//   return (
//     <div className="Hangman">
//       <h1>Hangman</h1>
//       <div className="Hangman-word">{getMaskedWord()}</div>
//       <div className="Hangman-wrong-guesses">{getWrongGuesses()}</div>
//       <form className="Hangman-form" onSubmit={handleGuess}>
//         <input
//           type="text"
//           value={guess}
//           maxLength="1"
//           onChange={(e) => setGuess(e.target.value.toLowerCase())}
//           disabled={numWrongGuesses >= MAX_GUESSES}
//         />
//         <button type="submit" disabled={numWrongGuesses >= MAX_GUESSES}>
//           Guess
//         </button>
//       </form>
//       <div className="Hangman-guesses-remaining">
//         Guesses remaining: {MAX_GUESSES - numWrongGuesses}
//       </div>
//       <button className="Hangman-restart-button" onClick={restartGame}>
//         Restart
//       </button>
//     </div>
//   );
// }

// export default Hangman;