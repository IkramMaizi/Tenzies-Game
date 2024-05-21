import './App.css';
import React from "react"
import Die from "./Die.js"
import Confetti from "react-confetti"


function App() {

  
  const [timer, setTimer] = React.useState({
    start: 0,
    end: 0,
    period: 0
  });
  const [dice, setDice] = React.useState(newDice());
  const [gameCompleted, setGameCompleted] = React.useState(false); 
  React.useEffect(
    ()=>{
      let allHold= true;
      let allSame= true; 
      for (let i=0 ; i<dice.length ; i++){
        if(dice[i].isHold === false)
          allHold=false;
        if(dice[0].value !== dice[i].value)
          allSame=false;
        }
        if( allHold && allSame){
          setGameCompleted (true)}

    },[dice]
  )

  React.useEffect(
    ()=>{
      if (!gameCompleted){
        let start = new Date().getTime();
        setTimer(prevTimer => ({
          ...prevTimer,
          start: start,
        }))
        console.log("entered1");
      } else{
        let end = new Date().getTime();
        setTimer(prevTimer => ({
          ...prevTimer,
          end: end,
          period: new Date().getTime() - prevTimer.start
        }))
        console.log("entered2");
      }

    },[gameCompleted]
  )

  function setNewDie(i) {
    return(
    {index: i,
    value: Math.floor(Math.random() * 6) + 1,
    isHold: false})
  }
  
  function newDice(){
    
    let newArray=[];
    for (let i=0 ; i<16 ; i++){
      let newDie= setNewDie(i);
      newArray.push(newDie);
    }
    return newArray;
  }

  function rollDice(){
    
    if (gameCompleted === true){
      setGameCompleted (false);
      setDice(newDice());
      
    }
      
    else{
    setDice(prevDice => {
      let newArray=[];
      for (let i=0 ; i<dice.length ; i++){
        if(prevDice[i].isHold === true)
          newArray.push(prevDice[i]);
        else{
          newArray.push(setNewDie(i))
        }
        
      }
      return newArray;
    }

    )};
  }

  function holdDie(index){
    setDice((prevDice) => {
      let newDice = [];
      for ( let i=0 ; i<dice.length ; i++){
        if(prevDice[i].index === index){
           newDice.push({
            ...prevDice[i],
            isHold: !prevDice[i].isHold
           })
        }
        else{
          newDice.push(prevDice[i]);
        }
      }
      return newDice;
    })
  }

  

  const diceComponets= dice.map(die => (
    <Die dieNumber={die.value} holdDie={holdDie} dieIndex={die.index} isHold={die.isHold}/>
     ))

  


  return (
    
    <div className="App">
    
      {gameCompleted && <Confetti recycle={false}/>}
        <h2 className="title">
          Tenzies Game!
        </h2>
        <div className = "game--container">
        <div className = "dice--container">
         {diceComponets}
        </div>
        {gameCompleted ? <button className='roll-button' onClick={rollDice}>New Game</button> : 
        <button className='roll-button' onClick={rollDice}>Roll The Dice</button>}
        </div>
        {gameCompleted && <p className="game--score">you have completed the game in {Math.floor(timer.period/1000)} seconds</p> }
    </div>
  );
}

export default App;
