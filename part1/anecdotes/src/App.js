import React, { useState } from 'react';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const Votes = ({ votes }) => {
  return (
    <div>has {votes} votes</div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  );

  const handleNextAnecdote = () => {
    const idx = getRandomInt(0, anecdotes.length);
    setSelected(idx);
  };

  const handleVoteClick = () => {
    const newVotes = { ...votes };
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const getMaxVotesIdx = () => {
    let curMax = 0;
    let maxIdx = 0;
    for (const key in votes) {
      const curVal = votes[key];
      if (curVal > curMax) {
        curMax = curVal;
        maxIdx = key;
      }
    }
    return maxIdx;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Votes votes={votes[selected]} />
      <div>
        <Button handleClick={handleVoteClick} text='vote' />
        <Button handleClick={handleNextAnecdote} text='next anecdote' />
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[getMaxVotesIdx()]}</div>
    </div>
  );
};

export default App;
