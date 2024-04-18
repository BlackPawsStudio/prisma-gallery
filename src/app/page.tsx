"use client";
import Prism from "@/components/Prism";
import "./globals.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { ArtistTile } from "@/components/HomePage/ArtistTile";
import { IUser } from "@/utils/types";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [data, setData] = useState<IUser[] | null>(null);

  useLayoutEffect(() => {
    const dbRequest = async () => {
      const response = await await fetch(`/api/getUser`);
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData);
    };
    void dbRequest();
  }, []);

  const [clientWidth, setClientWidth] = useState<number>(0);
  const [clientHeight, setClientHeight] = useState<number>(0);

  useEffect(() => {
    setClientWidth(window.innerWidth);
    setClientHeight(window.innerHeight);
    window.onload = () => {
      setClientWidth(window.innerWidth);
      setClientHeight(window.innerHeight);
    };
    window.onresize = () => {
      setClientWidth(window.innerWidth);
      setClientHeight(window.innerHeight);
    };
  }, []);

  const router = useRouter();

  return (
    <div
      className="absolute w-screen h-screen flex items-center overflow-hidden justify-center bg-gradient-to-b from-white via-white to-black"
      style={{
        perspective: "500px",
      }}
    >
      <div className="fixed top-[5vh] left-1/2 w-1/3 -translate-x-1/2 text-center text-black flex flex-col gap-2 z-50">
        <h1 className="text-4xl font-bold">PRISMA GALLERY</h1>
        <h2 className="text-xl">
          Create your own <i>prisma</i> gallery
          <br /> and view galleries of other artists
        </h2>
        {data && (
          <div className="flex flex-wrap overflow-y-auto justify-center gap-5 mt-10 py-5">
            {data.map((el) => (
              <ArtistTile key={el.id} data={el} />
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => router.push("/artist/create")}
        className="fixed top-[2vh] right-[5vh] hover:scale-110 z-30 border-2 border-black rounded-full py-3 px-5 backdrop-invert mix-blend-difference text-white transition-all"
      >
        Create your own gallery
      </button>
      <Prism
        spinL
        outer
        sideColor="linear-gradient(black, white)"
        sides={new Array(4).fill("")}
        height={clientHeight}
        width={clientWidth}
        border="5px solid #000"
      />
    </div>
  );
};

export default HomePage;
