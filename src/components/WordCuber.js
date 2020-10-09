import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import cubifyWord from '../utils/cubifyWord';
import '../App.css';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

export default function WordCuber() {
   const history = useHistory();

   const query = useQuery();
   const WORD_KEY = 'w';
   const queryWord = query.get(WORD_KEY) ?? '';

   let [word, setWord] = React.useState(queryWord);
   let [inputUsed, setInputUsed] = React.useState(false);

   if (word !== queryWord) {
      if (inputUsed) {
         if (word === '') {
            query.delete(WORD_KEY);
         } else {
            query.set(WORD_KEY, word);
         }
         history.replace({ pathname: '/', search: '?' + query.toString() });
         setInputUsed(false);
      } else {
         setWord(queryWord);
      }
   }

   const handleWordChange = (event) => {
      setInputUsed(true);
      setWord(event.target.value);
   }

   return (
      <div className='App'>
         <header className='App-header'>
            <input type='text' value={word} onChange={handleWordChange}></input>
            <br />
            <pre>{cubifyWord(word)}</pre>
         </header>
      </div>
   )
}