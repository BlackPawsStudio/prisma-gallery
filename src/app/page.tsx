'use client';
import Prism from '@/components/Prism';
import './globals.css';
import { useEffect, useState } from 'react';
import { data } from '@/demoInfo';
import { ArtistTile } from '@/components/HomePage/ArtistTile';

const HomePage = () => {
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
      className="absolute w-screen h-screen flex items-center overflow-hidden justify-center bg-gradient-to-b from-white via-white to-black"
      style={{
        perspective: '500px',
      }}
    >
      <div className="fixed top-[5vh] left-1/2 w-1/3 -translate-x-1/2 text-center text-black flex flex-col gap-2 z-50">
        <h1 className="text-4xl font-bold">PRISMA GALLERY</h1>
        <h2 className="text-xl">
          Create your own <i>prisma</i> gallery
          <br /> and view galleries of other artists
        </h2>
        <div className="flex flex-wrap overflow-y-auto justify-center gap-5 mt-10 py-5">
          {data.map((el) => (
            <ArtistTile key={el.id} data={el} />
          ))}
        </div>
      </div>
      <Prism
        spin
        outer
        sideColor="linear-gradient(black, white)"
        sides={new Array(4).fill('')}
        height={clientHeight}
        width={clientWidth}
        border="5px solid #000"
      />
    </div>
  );
};

export default HomePage;
