import React from 'react';
import { BrowserRouter } from "react-router-dom";
import WordCuber from './components/WordCuber';

function App() {
  return (
    <BrowserRouter basename='/'>
      <WordCuber />
    </BrowserRouter>
  );
}

export default App;
