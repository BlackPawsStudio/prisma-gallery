"use client";
import "@/app/globals.css";
import "swiper/css";
import { useEffect, useState } from "react";
import Prism from "@/components/Prism";
import ParticlesComponent from "@/components/Particles";

const ArtistPage = () => {
  const [slide, setSlide] = useState(0);

  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [clientHeight, setClientHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.onload = () => {
      setClientWidth(window.innerWidth);
      setClientHeight(window.innerHeight);
    };
    window.onresize = () => {
      setClientWidth(window.innerWidth);
      setClientHeight(window.innerHeight);
    };
  }, []);

  return (
    <div
      className={
        "relative w-screen h-screen flex items-center justify-center text-white overflow-hidden bg-gradient-to-b from-main to-mainDarker"
      }
    >
      <ParticlesComponent />
      <div
        className={"-z-1 absolute w-full h-full top-0 left-0 overflow-hidden"}
        style={{
          perspective: `${clientWidth / 3}px`,
        }}
      >
        <div className="w-full bg-lightGradient h-full absolute top-0 left-1/2 origin-top animate-lightMove" />
      </div>
      <div className="fixed top-0 z-10 left-0 w-screen h-screen flex items-center justify-between">
        <div
          className="h-full w-1/3 cursor-pointer hover:bg-gradient-to-tr from-light via-transparent to-transparent"
          onClick={() => setSlide((p) => p + 1)}
        />
        <div
          className="h-full w-1/3 cursor-pointer hover:bg-gradient-to-tl from-light via-transparent to-transparent"
          onClick={() => setSlide((p) => p - 1)}
        />
      </div>
      <div
        style={{
          perspective: "500px",
        }}
      >
        <Prism
          outer
          height={clientHeight}
          width={clientWidth}
          sides={new Array(12).fill('')}
          smooth="0.5s"
          showTile={slide}
          topColor={"transparent"}
          bottomColor={"var(--main-darker-color)"}
          sideColor={"linear-gradient(transparent, var(--main-darker-color))"}
          border="2px solid var(--light-color)"
        />
      </div>
    </div>
  );
};

export default ArtistPage;
