import "./App.scss";
import "./App.css";
import { useEffect, useState } from "react";
import Resize from "./functions/Resize";
// const width = toPX('100vw')
// const height = toPX('100vh')
// const birdSize = width/50;
// const pipeWidth = width/25;
// const gap = width/5;
function App() {
  
  let  toPX = require('to-px')
  const [height, width]= Resize()
  // const [width, setScreenWidth] = useState(0)
  // const [height, setScreenHeight] = useState(0)
  const [birdSize, setBirdSize] = useState(width/50);
  const [pipeWidth, setPipeWidth] = useState(width/25);
  const [gap, setGap] = useState(width/5);
  const [birdPosition, setBirdPosition] = useState(height/2 - birdSize);
  const [start, setStart] = useState(0);
  const [pipeHeight, setPipeHeight] = useState(100);
  const [pipeLeft, setPipeLeft] = useState(width - pipeWidth);
  const [rotate, setRotate] = useState(0)
  const [score, setScore] = useState(0)
  const bottomPipeHeight = height - pipeHeight - gap;




  useEffect(()=>{
    // setScreenWidth(width)
    // setScreenHeight(height)
    setBirdSize(width/50)
    setPipeWidth(40)
    setGap(width/5)
  },[width, height])









  useEffect(() => {
    let pipePosition;
    if (start === 1 && pipeLeft >= 0 - pipeWidth) {
      pipePosition = setInterval(() => {
        setPipeLeft((pipeLeft) => pipeLeft - 2);
      }, 24);
      return () => {
        clearInterval(pipePosition);
      };
    } else {
      setPipeLeft(width - pipeWidth);
      setPipeHeight(Math.floor(Math.random() * (height - gap)));
      setScore(score => score + 1)
    }
  }, [pipeLeft, start]);

  useEffect(() => {
    let newBirdPosition;
    if (birdPosition < height - birdSize && start === 1) {
      newBirdPosition = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + 10);
        setRotate(20)
      }, 24);
    }

    return () => {
      clearInterval(newBirdPosition);
      // setBirdPosition(250-birdSize)
    };
  }, [birdPosition, start]);
  
  const jump = () => {
    console.log(width);
    let newBirdPosition = birdPosition - height/5;
    if (start === 0) {
      setScore(0)
      setStart(1);
    } else if (newBirdPosition < 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition);
      setRotate(-30)
    }
  };
  useEffect(() => {
    const hasCollidedWithPipe = birdPosition >= 0 && birdPosition < pipeHeight;
    const hasCollidedWithBottomPipe =
      birdPosition <= height && birdPosition >= height - bottomPipeHeight;
      if(pipeLeft >=0 && pipeLeft <= pipeWidth && (hasCollidedWithPipe || hasCollidedWithBottomPipe)){
        setStart(0)
        console.log(score);
      }
  },[birdPosition, bottomPipeHeight, pipeHeight, pipeLeft]);
  return (
    <div className="App">
      <div className="game__container" style={{width:width, height:height}} onClick={jump}>
        <div className="score">{start===1?score:''}</div>
        <div className="bird" style={{ top: `${birdPosition}px`,width:`${width/16}px`, height:`${height/16}px`, transform: `rotate(${rotate}deg)` }}></div>
        <div
          className="obstacle top"
          style={{
            width: `${pipeWidth}px`,
            height: `${pipeHeight}px`,
            left: `${pipeLeft}px`,
          }}
        ></div>
        <div
          className="obstacle"
          style={{
            width: `${pipeWidth}px`,
            height: `${bottomPipeHeight}px`,
            left: `${pipeLeft}px`,
            top: `${height - bottomPipeHeight}px`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
