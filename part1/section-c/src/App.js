import React, { useState } from 'react';

const Display = ({ counter, cmds }) => {
  if (cmds.length === 0) {
    return (
      <div>Press the buttons to use the application</div>
    );
  }
  return (
    <div>
      <div>Value: {counter}</div>
      <div>Commands: {cmds.join(' ')}</div>
    </div>
  );

};

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} >
      {text}
    </button >
  );
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [cmds, setCmds] = useState([]);

  const increaseByOne = () => {
    setCounter(counter + 1);
    setCmds(cmds.concat('+1'));
  };
  const decreaseByOne = () => {
    setCounter(counter - 1);
    setCmds(cmds.concat('-1'));
  };
  const setToZero = () => {
    setCounter(0);
    setCmds([]);
  };

  return (
    <div>
      <Display counter={counter} cmds={cmds} />
      <Button onClick={increaseByOne} text='inc' />
      <Button onClick={setToZero} text='reset' />
      <Button onClick={decreaseByOne} text='dec' />
    </div>
  );
};

export default App;
