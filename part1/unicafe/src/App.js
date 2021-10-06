import React, { useState } from 'react';

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  );
};

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const Statistics = ({ submissions }) => {
  const total = submissions.good + submissions.bad + submissions.neutral;
  const average = (submissions.good + (-1 * submissions.bad)) / total;
  const positive = submissions.good / total;

  return (
    <div>
      <div>good {submissions.good}</div>
      <div>neutral {submissions.neutral}</div>
      <div>bad {submissions.bad}</div>
      <div>all {total}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </div>
  );

};

const App = () => {
  // save clicks of each button to its own state
  const [submissions, setSubmissions] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodClick = () => {
    setSubmissions({
      ...submissions,
      good: submissions.good + 1
    });
  };

  const handleNeutralClick = () => {
    setSubmissions({
      ...submissions,
      neutral: submissions.neutral + 1
    });
  };

  const handleBadClick = () => {
    setSubmissions({
      ...submissions,
      bad: submissions.bad + 1
    });
  };


  return (
    <div>
      <Header text='give feedback' />

      <Button text='good' handleClick={handleGoodClick} />
      <Button text='neutral' handleClick={handleNeutralClick} />
      <Button text='bad' handleClick={handleBadClick} />

      <Header text='statistics' />
      <Statistics submissions={submissions} />
    </div>
  );
};

export default App;
