import React, { useState } from 'react';

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  );
};

const Button = ({ text, onClickHandler }) => {
  return (
    <button onClick={onClickHandler}>{text}</button>
  );
};

const Statistic = ({ rating, count }) => {
  return (
    <div>{rating} {count}</div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);
  const average = (good, bad, neutral) => {
    const cumulativeSum = good + bad + neutral;
    if (cumulativeSum === 0) {
      return 0;
    }
    return (good + (bad * -1)) / (good + bad + neutral);
  };
  const positive = (good, bad, neutral) => {
    const cumulativeSum = good + bad + neutral;
    if (cumulativeSum === 0) {
      return 0;
    }
    return good / (good + bad + neutral);
  };

  return (
    <div>
      <Header text='give feedback' />
      <Button text='good' onClickHandler={addGood} />
      <Button text='neutral' onClickHandler={addNeutral} />
      <Button text='bad' onClickHandler={addBad} />
      <Header text='statistics' />
      <Statistic rating='good' count={good} />
      <Statistic rating='neutral' count={neutral} />
      <Statistic rating='bad' count={bad} />
      <Statistic rating='total' count={good + bad + neutral} />
      <Statistic rating='average' count={average(good, bad, neutral)} />
      <Statistic rating='positive' count={positive(good, bad, neutral)} />
    </div>
  );
};

export default App;
