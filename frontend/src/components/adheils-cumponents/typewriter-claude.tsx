import React, { useState, useEffect } from "react";

const TypewriterAnimation = ({
  text = "Hello World! This is a typewriter animation. It works across multiple lines!",
  speed = 50,
  cursorChar = "|",
  cursorBlinkSpeed = 500,
  startDelay = 0,
  onComplete = () => {},
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Handle typewriter effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        },
        currentIndex === 0 ? startDelay : speed,
      );

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [currentIndex, text, speed, startDelay, isComplete, onComplete]);

  // Handle cursor blinking
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorTimer);
  }, [cursorBlinkSpeed]);

  // Split text into lines and render with proper formatting
  // const renderText = () => {
  //     const lines = displayText.split('\n');
  //     return lines.map((line, index) => (
  //         <div key={index} className="min-h-[1.5rem] flex-1 w-[100%] block">
  //             {line}
  //             {index === lines.length - 1 && (
  //                 <span
  //                     className={`${
  //                         showCursor ? 'opacity-100' : 'opacity-0'
  //                     } transition-opacity duration-100`}
  //                 >
  //                     {cursorChar}
  //                 </span>
  //             )}
  //         </div>
  //     ));
  // };

  // return (
  //     <div className="text-base font-medium w-[100%] flex-1 leading-relaxed">
  //         {renderText()}
  //     </div>
  // );

  const renderText = () => {
    const lines = displayText.split("\n");
    return lines.map((line, index) => (
      <div key={index} className="min-h-[1.5rem] flex-1 w-[100%] block">
        {line}
        {index === lines.length - 1 && (
          <span
            className={`${
              showCursor ? "opacity-100" : "opacity-0"
            } transition-opacity duration-100`}
          >
            {cursorChar}
          </span>
        )}
      </div>
    ));
  };

  return (
    <div className="text-base font-medium w-full flex flex-col leading-relaxed">
      {renderText()}
    </div>
  );
};

export default TypewriterAnimation;
