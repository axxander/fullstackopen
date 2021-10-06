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

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <div>{text} {value} %</div>
    );
  }
  return (
    <div>{text} {value}</div>
  );
};

const Statistics = ({ submissions }) => {
  const total = submissions.good + submissions.bad + submissions.neutral;
  const average = (submissions.good + (-1 * submissions.bad)) / total;
  const positivePercent = (submissions.good / total) * 100.0;

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    );
  }
  return (
    <div>
      <StatisticLine text='good' value={submissions.good} />
      <StatisticLine text='neutral' value={submissions.neutral} />
      <StatisticLine text='bad' value={submissions.bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positivePercent} />
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
