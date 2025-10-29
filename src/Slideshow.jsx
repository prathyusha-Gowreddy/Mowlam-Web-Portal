import React, { useState, useEffect } from "react";
import image1 from "./assets/nuringhome1.jpg";
import image2 from "./assets/nuringhome2.jpg";
import image3 from "./assets/nuringhome3.jpg";
import image4 from "./assets/nuringhome4.jpg";
import "./Slideshow.css";

const images = [image1, image2, image3, image4];

function Slideshow() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500); // fade-out
    }, 6000); // interval between transitions

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <img
        src={images[index]}
        alt="Slide"
        className={`slideshow-image ${fade ? "fade-in" : "fade-out"}`}
      />
    </div>
  );
}

export default Slideshow;
