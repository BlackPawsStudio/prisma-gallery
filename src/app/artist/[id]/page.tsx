'use client';
import '@/app/globals.css';
import 'swiper/css';
import { useEffect, useMemo, useState } from 'react';
import Prism from '@/components/Prism';
import { TitleSlide } from '@/components/ArtistPage/TitleSlide';
import { ImageSlide } from '@/components/ArtistPage/ImageSlide';
import { data as usersData } from '@/demoInfo';
import { useRouter } from 'next/navigation';

const ArtistPage = () => {
  const data = usersData[0];

  const [slide, setSlide] = useState(-1);

  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [clientHeight, setClientHeight] = useState(window.innerHeight);

  const router = useRouter();

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

  const slides = useMemo(() => {
    const title = <TitleSlide data={data} />;
    const images = data.images.concat().map((el) => <ImageSlide data={el} key={el.id} />);

    return [title, ...images].reverse();
  }, [data]);

  return (
    <div
      className={
        'relative w-screen h-screen flex items-center justify-center text-text overflow-hidden bg-gradient-to-b from-main to-mainDarker'
      }
    >
      <button
        onClick={() => router.push('/')}
        className="fixed top-[5vh] right-[5vh] hover:scale-110 z-30 bg-transparent w-10 h-10 border-2 border-mainDarker rounded-full p-7"
      >
        <div className="absolute bg-mainDarker w-1 h-10 rounded-full rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
        <div className="absolute bg-mainDarker w-1 h-10 rounded-full -rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      </button>
      <div
        className={'-z-1 absolute w-full h-full top-0 left-0 overflow-hidden'}
        style={{
          perspective: `${clientWidth / 3}px`,
        }}
      >
        <div className="w-full bg-lightGradient h-full absolute top-0 left-1/2 origin-top animate-lightMove" />
      </div>
      <div className="fixed top-0 z-10 left-0 w-screen h-screen flex items-center justify-between">
        <div
          className="h-full w-1/3 cursor-pointer bg-gradient-to-tr opacity-0 hover:opacity-100 from-light via-transparent to-transparent transition-all"
          onClick={() => setSlide((p) => p + 1)}
        />
        <div
          className="h-full w-1/3 cursor-pointer bg-gradient-to-tl opacity-0 hover:opacity-100 from-light via-transparent to-transparent transition-all"
          onClick={() => setSlide((p) => p - 1)}
        />
      </div>
      <div
        style={{
          perspective: '500px',
        }}
      >
        <Prism
          outer
          height={clientHeight}
          width={clientWidth}
          sides={slides}
          smooth="0.5s"
          showTile={slide}
          topColor={'transparent'}
          sideColor={'linear-gradient(var(--card-color), var(--card-darker-color))'}
          bottomColor={'var(--card-darker-color)'}
          border="2px solid var(--light-color)"
        />
      </div>
    </div>
  );
};

export default ArtistPage;
