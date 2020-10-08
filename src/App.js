import React from 'react';
import './App.css';

function cubifyWord(word) {
  if (word.length < 2) return word;

  const spacedWord = word.split('').join(' ');
  const odd = word.length % 2;
  const mid = Math.floor(word.length / 2);
  let retStr = ' '.repeat(2 * mid) + spacedWord + '\n';

  for (let i = 1; i < mid; i++) {
    retStr += "  ".repeat(mid - i)
    retStr += "/ "
    retStr += "  ".repeat(i - 1)
    retStr += word[i]
    retStr += " ".repeat(2 * (word.length - i - 1) - 1)
    retStr += "/ "
    retStr += " ".repeat(2 * (i - 1))
    retStr += word[word.length - i - 1]

    retStr += "\n"
  }

  retStr += spacedWord
  retStr += " ".repeat(2 * mid - 1)
  retStr += word[mid - ((word.length + 1) % 2)] + "\n"

  for (let i = 1; i < mid - 1 + odd; i++) {
    retStr += word[i]
    retStr += " ".repeat(2 * (mid - 1) + 1)
    retStr += word[mid + i]
    retStr += " ".repeat(2 * (word.length - mid - 2) + 1)
    retStr += word[word.length - i - 1]
    retStr += " ".repeat(2 * (mid - 1) + 1)
    retStr += word[word.length - mid - i - 1]

    retStr += "\n"
  }

  retStr += word[mid - 1 + odd]
  retStr += " ".repeat(2 * (mid - 1) + 1)
  retStr += spacedWord.split('').reverse().join('') + "\n"

  for (let i = 0; i < word.length - mid - 1 - odd; i++) {
    retStr += word[mid + i + odd]
    retStr += "  ".repeat(mid - i - 2)
    retStr += " /"
    retStr += " ".repeat(2 * (mid + i - 1) + 1 + odd)
    if (odd) { retStr += " " }
    retStr += word[word.length - mid - i - 1 - odd]
    retStr += "  ".repeat(mid - i - 2)
    retStr += " /"
    retStr += "\n"
  }

  retStr += spacedWord.split('').reverse().join('') + "\n"

  return retStr;
}

function App() {
  let [word, setWord] = React.useState('');

  return (
    <div className="App">
      <header className="App-header">
        <input type='text' value={word} onChange={(e) => setWord(e.target.value)}></input>
        <br />
        <pre>{cubifyWord(word)}</pre>
      </header>
    </div>
  );
}

export default App;
