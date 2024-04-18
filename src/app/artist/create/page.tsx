"use client";
import "@/app/globals.css";
import "swiper/css";
import { useEffect, useState } from "react";
import Prism from "@/components/Prism";
import { IColors } from "@/utils/types";
import { useRouter } from "next/navigation";
import { EditColorsForm } from "@/components/CreatePage/EditColorsForm";

const CreatePage = () => {
  const [colors, setColors] = useState<IColors>({
    mainColor: "#000000ff",
    mainDarkerColor: "#000000ff",
    cardColor: "#000000ff",
    cardDarkerColor: "#000000ff",
    lightColor: "#ffffffff",
    textColor: "#ffffffff",
    topColor: "#000000ff",
    bottomColor: "#000000ff",
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--main-color", colors.mainColor);
    root.style.setProperty(
      "--main-darker-color",
      colors.mainDarkerColor || "transparent"
    );
    root.style.setProperty("--card-color", colors.cardColor || "transparent");
    root.style.setProperty(
      "--card-darker-color",
      colors.cardDarkerColor || "transparent"
    );
    root.style.setProperty("--light-color", colors.lightColor || "transparent");
    root.style.setProperty("--text-color", colors.textColor);
    root.style.setProperty("--top-color", colors.topColor || "transparent");
    root.style.setProperty(
      "--bottom-color",
      colors.bottomColor || "transparent"
    );
  }, [
    colors.bottomColor,
    colors.cardColor,
    colors.cardDarkerColor,
    colors.lightColor,
    colors.mainColor,
    colors.mainDarkerColor,
    colors.textColor,
    colors.topColor,
  ]);

  const router = useRouter();

  return (
    <div
      className={
        "relative w-screen h-screen flex items-center justify-around text-text overflow-hidden bg-gradient-to-b from-main to-mainDarker"
      }
    >
      <button
        onClick={() => router.push("/")}
        className="fixed top-[5vh] right-[5vh] hover:scale-110 z-30 w-10 h-10 border-2 border-text rounded-full p-7"
      >
        <div className="absolute bg-text w-1 h-10 rounded-full rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
        <div className="absolute bg-text w-1 h-10 rounded-full -rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      </button>
      <div
        className={"-z-1 absolute w-full h-full top-0 left-0 overflow-hidden"}
        style={{
          perspective: "500px",
        }}
      >
        <div className="w-full bg-lightGradient h-full absolute top-0 left-1/2 origin-top animate-lightMove" />
      </div>

      <div className="absolute w-1/3 top-10 text-black left-1/2 -translate-x-1/2 flex flex-col gap-5">
        <input
          type="text"
          className="p-4 rounded-full "
          placeholder="Enter your nickname"
        />
        <input
          type="text"
          className="p-4 rounded-full"
          placeholder="Enter password"
        />
      </div>

      <div className="w-1/3 z-10 overflow-y-auto h-1/2">
        <EditColorsForm colors={colors} setColors={setColors} />
      </div>

      <div className="flex gap-4 w-1/3">
        <div className="flex flex-col items-center gap-5">
          Top side
          <div
            style={{
              perspective: "1000px",
              perspectiveOrigin: "50% -70%",
            }}
          >
            <Prism
              spinR
              height={200}
              width={200}
              sides={new Array(6).fill("")}
              topColor={colors?.topColor ? colors.topColor : undefined}
              bottomColor={colors?.bottomColor ? colors.bottomColor : undefined}
              sideColor={`linear-gradient(${
                colors?.cardColor || "transparent"
              }, ${colors?.cardDarkerColor || "transparent"})`}
              border="2px solid var(--light-color)"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          Bottom side
          <div
            style={{
              perspective: "1000px",
              perspectiveOrigin: "50% 170%",
              rotate: "180deg",
            }}
          >
            <Prism
              spinR
              height={200}
              width={200}
              sides={new Array(6).fill("")}
              topColor={colors?.topColor ? colors.topColor : undefined}
              bottomColor={colors?.bottomColor ? colors.bottomColor : undefined}
              sideColor={`linear-gradient(${
                colors?.cardColor || "transparent"
              }, ${colors?.cardDarkerColor || "transparent"})`}
              border="2px solid var(--light-color)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
