import React,{useState,useEffect} from 'react';

// Reusable Loading Bar component
const LoadingBar = ({interval=100}) => {
  const word = "Loading..."; // Pre-defined word
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // If currentIndex reaches the length of the word, reset it to 0 to start from the beginning
      if (currentIndex < word.length) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        // Reset to 0 after reaching the end of the word to restart the animation
        setCurrentIndex(0);
      }
    }, interval); // interval determines how fast the letters appear

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, [currentIndex, word, interval]);

    return (
<div class="loader">
  <div class="load-inner load-one"></div>
  <div class="load-inner load-two"></div>
  <div class="load-inner load-three"></div>
      {word.slice(0, currentIndex).split("").map((letter, index) => (
        <span  key={index} style={{color:"#ff0054"}}>{letter} </span>
      ))}
</div>

    );
};

export default LoadingBar;
