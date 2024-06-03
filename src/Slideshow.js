import React from "react";
import {imageDictionary} from './data';
import {
  Link,
} from "react-router-dom";
import './css/Slideshow.css'

const delay = 5000;

function Slideshow({products, handleItemClick}) {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === products.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);



  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {products.map((src, index) => (
           <Link
                to={'/product'}
                onClick={() => handleItemClick(src)}
            >
              <div
                    className="slide"
                    key={index}
                    onClick={() => handleItemClick(src)}
                >
                    <img src={imageDictionary[src.picture]} />
                </div>
            </Link>
        ))}
      </div>

      <div className="slideshowDots">
        {products.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
