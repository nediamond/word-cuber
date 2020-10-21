import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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

   const handleWordChange = (event) => {
      const _word = event.target.value;

      if (_word === '') {
         query.delete(WORD_KEY);
      } else {
         query.set(WORD_KEY, btoa(_word));
      }
      history.replace({ pathname: '/', search: '?' + query.toString() });

      setWord(_word);
   }

   const wordCube = cubifyWord(word);
   return (
      <div className='container-fluid'>
         <nav className='navbar navbar-expand-lg navbar-dark'>
            <input className='mx-auto my-5' type='text' value={word} onChange={handleWordChange}></input>
            <CopyToClipboard text={wordCube}><button class="btn btn-dark ml-1"><i class="fa fa-cube"></i></button></CopyToClipboard>
            <CopyToClipboard text={window.location.href}><button class="btn btn-dark ml-1"><i class="fa fa-link"></i></button></CopyToClipboard>
         </nav>
         <div>
            <pre>{wordCube}</pre>
         </div>
      </div>
   )
}