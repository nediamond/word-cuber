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
   const decodedQueryWord = atob(decodeURI(queryWord));

   let [word, setWord] = React.useState(decodedQueryWord);
   let [inputUsed, setInputUsed] = React.useState(false);

   if (word !== decodedQueryWord) {
      if (inputUsed) {
         if (word === '') {
            query.delete(WORD_KEY);
         } else {
            query.set(WORD_KEY, btoa(word));
         }
         history.replace({ pathname: '/', search: '?' + query.toString() });
         setInputUsed(false);
      } else {
         setWord(decodedQueryWord);
      }
   }

   const handleWordChange = (event) => {
      setInputUsed(true);
      setWord(event.target.value);
   }

   return (
      <div className='container-fluid'>
         <nav className='navbar navbar-expand-lg navbar-dark'>
            <input className='mx-auto my-5' type='text' value={word} onChange={handleWordChange}></input>
         </nav>
         <div>
            <pre>{cubifyWord(word)}</pre>
         </div>
      </div>
   )
}