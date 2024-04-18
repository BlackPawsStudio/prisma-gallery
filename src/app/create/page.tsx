"use client";
import "@/app/globals.css";
import "swiper/css";
import { useEffect, useState } from "react";
import Prism from "@/components/Prism";
import { IColors } from "@/utils/types";
import { useRouter } from "next/navigation";
import { EditColorsForm } from "@/components/CreatePage/EditColorsForm";
import { hash } from "@/utils/hash";

const CreatePage = () => {
  const [colors, setColors] = useState<IColors>({
    mainColor: "#000000ff",
    mainDarkerColor: "#000000ff",
    cardColor: "#000000ff",
    cardDarkerColor: "#00000000",
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

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    setIsLoading(true);

    const validationResponse = await await fetch(
      `/api/user/checkUsername/?name=${username}`
    );

    const { exists } = await validationResponse.json();

    if (exists) {
      alert("Username already exists, please choose another one");
      return;
    }

    const response = await await fetch(`/api/user`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password: hash(password),
        colors,
      }),
    });

    await response.json();

    setIsLoading(false);
    router.push('/');
  };

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
          className="p-4 rounded-full border-black border-2"
          placeholder="Enter your nickname"
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
        />
        <input
          type="password"
          className="p-4 rounded-full border-black border-2"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
        />
      </div>

      <button
        onClick={onSubmit}
        className="absolute w-1/5 bottom-10 left-1/2 -translate-x-1/2 p-4 border-black rounded-full bg-white text-black border-2 text-center hover:scale-110 hover:bg-black hover:text-white transition-all active:scale-95"
      >
        {isLoading ? (
          <div className="animate-spin mix-blend-difference border-2 border-white rounded-full mx-auto border-r-transparent w-5 h-5" />
        ) : (
          "Create account!"
        )}
      </button>

      <div className="w-1/3 z-10 overflow-y-auto h-1/2">
        <EditColorsForm colors={colors} setColors={setColors} />
      </div>

      <div className="flex gap-4 w-1/3 z-10">
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
