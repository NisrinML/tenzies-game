import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollNum, setRollNum] = React.useState(0);
  const [isMax, setIsMax] = React.useState(false);
  const [higher,setHigher] =React.useState( 100);
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const first = dice[0].value;
    const allSameValue = dice.every((die) => die.value === first);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log(higher);
      console.log(rollNum)
      if (rollNum < higher) {
        setHigher( rollNum);
        setIsMax(true);
      } else {
        setIsMax(false);
      }
    }
  }, [dice]);
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }

    return newDice;
  }

  function rollDice() {
    setRollNum(rollNum + 1);
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld === false
          ?  {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
          } 
          : die;
      })
    );
    if (dice.every((die) => die.isHeld)) {
      setDice(allNewDice());
      setTenzies(false);
      setRollNum(0);
      setIsMax(false);
    }
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {isMax && <p className="win">New Higher Score</p>}
    </main>
  );
}
