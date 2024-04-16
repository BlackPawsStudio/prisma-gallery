'use client';
import '@/app/globals.css';
import 'swiper/css';
import { useEffect, useMemo, useState } from 'react';
import Prism from '@/components/Prism';
import { TitleSlide } from '@/components/ArtistPage/TitleSlide';
import { ImageSlide } from '@/components/ArtistPage/ImageSlide';
import { data as usersData } from '@/demoInfo';
import { useRouter } from 'next/navigation';

const ArtistPage = ({ params }: { params: { id: string } }) => {
  const data = usersData.find((el) => el.id === params.id);
  const colors = data?.colors;

  useEffect(() => {
    if (colors) {
      const root = document.documentElement;
      root.style.setProperty('--main-color', colors.mainColor);
      root.style.setProperty('--main-darker-color', colors.mainDarkerColor || 'transparent');
      root.style.setProperty('--card-color', colors.cardColor || 'transparent');
      root.style.setProperty('--card-darker-color', colors.cardDarkerColor || 'transparent');
      root.style.setProperty('--light-color', colors.lightColor || 'transparent');
      root.style.setProperty('--text-color', colors.textColor);
      root.style.setProperty('--top-color', colors.topColor || 'transparent');
      root.style.setProperty('--bottom-color', colors.bottomColor || 'transparent');
    }
  }, [colors]);

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
    if (!data) {
      router.push('/');
      return [];
    }
    const title = <TitleSlide data={data} />;
    const images = data.images.concat().map((el) => <ImageSlide data={el} key={el.id} />);

    return [title, ...images].reverse();
  }, [data, router]);

  if (!data) return;

  return (
    <div
      className={
        'relative w-screen h-screen flex items-center justify-center text-text overflow-hidden bg-gradient-to-b from-main to-mainDarker'
      }
    >
      <button
        onClick={() => router.push('/')}
        className="fixed top-[5vh] right-[5vh] hover:scale-110 z-30 w-10 h-10 border-2 border-text rounded-full p-7"
      >
        <div className="absolute bg-text w-1 h-10 rounded-full rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
        <div className="absolute bg-text w-1 h-10 rounded-full -rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
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
          topColor={colors?.topColor ? colors.topColor : undefined}
          bottomColor={colors?.bottomColor ? colors.bottomColor : undefined}
          sideColor={`linear-gradient(${colors?.cardColor || 'transparent'}, ${
            colors?.cardDarkerColor || 'transparent'
          })`}
          border="2px solid var(--light-color)"
        />
      </div>
    </div>
  );
};

export default ArtistPage;
