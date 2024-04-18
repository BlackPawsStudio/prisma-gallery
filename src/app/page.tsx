"use client";
import Prism from "@/components/Prism";
import "./globals.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { ArtistTile } from "@/components/HomePage/ArtistTile";
import { IUser } from "@/utils/types";
import { useRouter } from "next/navigation";
import { LogInModal } from "@/components/HomePage/LogInModal";
import { Spinner } from "@/components/Spinner";

const HomePage = () => {
  const [data, setData] = useState<IUser[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [showModal, setShowModal] = useState<boolean>(false);

  useLayoutEffect(() => {
    const dbRequest = async () => {
      const response = await await fetch(`/api/user`);
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    };
    void dbRequest();
  }, []);

  const [clientWidth, setClientWidth] = useState<number>(0);
  const [clientHeight, setClientHeight] = useState<number>(0);
  
  const [userName, setUserName] = useState<string | null>("");

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
    setUserName(localStorage.getItem("nickname"));
  }, []);

  const router = useRouter();

  return (
    <div
      className="absolute w-screen h-screen flex items-center overflow-hidden justify-center bg-gradient-to-b from-white via-white to-black"
      style={{
        perspective: "500px",
      }}
    >
      {showModal && <LogInModal close={() => setShowModal(false)} />}
      <div className="fixed top-[5vh] left-1/2 w-1/3 -translate-x-1/2 text-center text-black flex flex-col gap-2 z-40">
        <h1 className="text-4xl font-bold">PRISMA GALLERY</h1>
        <h2 className="text-xl">
          Create your own <i>prisma</i> gallery
          <br /> and view galleries of other artists
        </h2>
        {isLoading && <Spinner className="mx-auto mt-32" />}
        {data && !isLoading && (
          <div className="flex flex-wrap overflow-y-auto justify-center gap-5 mt-10 py-5">
            {data.map((el) => (
              <ArtistTile key={el.id} data={el} />
            ))}
          </div>
        )}
      </div>
      {userName ? (
        <>
          <button
            onClick={() => router.push(`/artist/${userName}`)}
            className="fixed top-[2vh] right-[5vh] hover:scale-110 z-30 border-2 border-black rounded-full py-3 px-5 backdrop-invert mix-blend-difference text-white transition-all"
          >
            Visit your profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("nickname");
              setUserName(null);
            }}
            className="fixed top-[8vh] right-[5vh] hover:scale-110 z-30 border-2 border-black rounded-full py-3 px-5 backdrop-invert mix-blend-difference text-white transition-all"
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => router.push("/create")}
            className="fixed top-[2vh] right-[5vh] hover:scale-110 z-30 border-2 border-black rounded-full py-3 px-5 backdrop-invert mix-blend-difference text-white transition-all"
          >
            Create your own gallery
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="fixed top-[8vh] right-[5vh] hover:scale-110 z-30 border-2 border-black rounded-full py-3 px-5 backdrop-invert mix-blend-difference text-white transition-all"
          >
            Log in
          </button>
        </>
      )}
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
