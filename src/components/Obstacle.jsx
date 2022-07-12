import React, { useEffect, useState } from 'react'
function Obstacle({height,
    gap,
    birdPosition,
    start,
width,score,
setScore,setStart,
   
    }) {
        const [screenWidth, setScreenWidth] = useState(0)
        const [screenHeight, setScreenHeight] = useState(0)
        const [pipeWidth, setPipeWidth] = useState(screenWidth/25);
        const [pipeHeight, setPipeHeight] = useState(100);
        const [pipeLeft, setPipeLeft] = useState(screenWidth - pipeWidth);
        const bottomPipeHeight = height - pipeHeight - gap;
        useEffect(()=>{
            setScreenWidth(width) 
            setScreenHeight(height)
            setPipeWidth(screenWidth/50)
            setPipeHeight(height/5)
            setPipeLeft(screenWidth - pipeWidth)
          },[width, height, screenWidth, pipeWidth])
        
        useEffect(() => {
            const hasCollidedWithPipe = birdPosition >= 0 && birdPosition < pipeHeight;
            const hasCollidedWithBottomPipe =
              birdPosition <= height && birdPosition >= height - bottomPipeHeight;
              if(pipeLeft >=0 && pipeLeft <= pipeWidth && (hasCollidedWithPipe || hasCollidedWithBottomPipe)){
                setStart(0)
              }
          },[birdPosition, bottomPipeHeight, pipeHeight, pipeLeft]);
    useEffect(() => {
        let pipePosition;
        if (start === 1 && pipeLeft >= 0 - pipeWidth) {
          pipePosition = setInterval(() => {
            setPipeLeft((pipeLeft) => pipeLeft - 2);
          }, 24);
          return () => {
            clearInterval(pipePosition);
          };
        }
      
        else {
          setPipeLeft(width - pipeWidth);
          setPipeHeight(Math.floor(Math.random() * (height - gap)));
          setScore(score => score + 1)
        
     
        }
      }, [pipeLeft, start]);

    

   
    
  return (<>
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
            </>
  )
}

export default Obstacle