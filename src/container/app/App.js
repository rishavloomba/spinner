import React from 'react';
import Header from '../../components/Header';
import Question from '../../components/Question';
import Reward from '../../components/Reward';
import Spinner from '../../components/Spinner';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Spinner />
      <Reward />
      <Question />
    </div>
  );
}

export default App;
