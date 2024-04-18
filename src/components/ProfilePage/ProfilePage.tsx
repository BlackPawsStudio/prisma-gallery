"use client";
import "@/app/globals.css";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import Prism from "@/components/Prism";
import { IImage, IUser } from "@/utils/types";
import { useRouter } from "next/navigation";
import { EditColorsForm } from "@/components/CreatePage/EditColorsForm";
import { ImageEl } from "./ImageEl";
import { hash } from "@/utils/hash";

const ProfilePage = ({ data }: { data: IUser }) => {
  const [colors, setColors] = useState(data ? data.colors : null);

  useEffect(() => {
    if (colors) {
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
      root.style.setProperty(
        "--light-color",
        colors.lightColor || "transparent"
      );
      root.style.setProperty("--text-color", colors.textColor);
      root.style.setProperty("--top-color", colors.topColor || "transparent");
      root.style.setProperty(
        "--bottom-color",
        colors.bottomColor || "transparent"
      );
    }
  }, [colors]);

  const router = useRouter();

  const [name, setName] = useState<string>(data.name || "");
  const [description, setDescription] = useState<string>(
    data.description || ""
  );
  const [images, setImages] = useState<IImage[]>(data.images || []);

  const removeImage = (id: string) => {
    const newImages = images.filter((el) => el.id !== id);
    setImages(newImages);
    fetch(`/api/images/${id}`, {
      method: "DELETE",
    });
  };

  const imageTitleRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  const addImage = async () => {
    const title = imageTitleRef.current?.value;
    const url = imageUrlRef.current?.value;
    if (!title || !url) {
      alert("Please fill in all fields");
      return;
    }
    const newImages: IImage[] = [
      ...images,
      { id: hash(title), title, url, artistId: data.id },
    ];
    setImages(newImages);

    await fetch("/api/images", {
      method: "POST",
      body: JSON.stringify({
        id: hash(title),
        title,
        url,
        artistId: data.id,
      }),
    });

    imageTitleRef.current!.value = "";
    imageUrlRef.current!.value = "";
  };

  const onSubmit = async () => {
    if (!colors) return;
    const updatedUser: IUser = {
      ...data,
      name,
      description,
      colors,
    };

    const response = await await fetch(`/api/user/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
    });

    const responseData = await response.json();
    console.log(responseData);
  };

  return (
    <div
      className={
        "relative w-screen h-screen flex items-center justify-around text-text overflow-hidden bg-gradient-to-b from-main to-mainDarker"
      }
    >
      <div className="h-full flex flex-col gap-5 z-30 p-10 w-1/2">
        <input
          type="text"
          className="p-4 rounded-full border-black border-2 text-black"
          placeholder="Enter your nickname"
          defaultValue={data.name}
          onChange={(e) => setName(e.target.value)}
          minLength={3}
        />
        <textarea
          className="p-4 rounded-lg border-black border-2 h-52 text-black"
          placeholder="Enter your description"
          defaultValue={data.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex flex-col border-white rounded-3xl border-2 p-5 gap-5">
          <p className="w-full text-center text-2xl">Add new image</p>
          <div className="h-full flex justify-around">
            <input
              ref={imageTitleRef}
              type="text"
              className="p-4 rounded-full border-black border-2 text-black"
              placeholder="Image title"
            />
            <input
              ref={imageUrlRef}
              type="text"
              className="p-4 rounded-full border-black border-2 text-black"
              placeholder="Image URL"
            />
            <button
              className="py-4 px-8 border-black rounded-full bg-white text-black border-2 text-center hover:scale-110 hover:bg-black hover:text-white transition-all active:scale-95"
              onClick={addImage}
            >
              Add
            </button>
          </div>
        </div>
        {images && (
          <div className="overflow-x-auto h-52 w-full">
            <div className="h-full w-fit flex gap-5">
              {images.map((el, idx) => (
                <ImageEl data={el} key={idx} removeImage={removeImage} />
              ))}
            </div>
          </div>
        )}
        <button
          onClick={onSubmit}
          className="p-4 border-black rounded-full bg-white text-black border-2 text-center hover:scale-110 hover:bg-black hover:text-white transition-all active:scale-95"
        >
          Save changes
        </button>
      </div>

      <div className="h-full flex gap-32 z-30 p-10">
        {colors && (
          <div className="w-1/3 z-10 overflow-y-auto h-full">
            <EditColorsForm colors={colors} setColors={setColors} />
          </div>
        )}

        <div className="flex flex-col gap-32 w-1/3 z-10 h-full">
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
                bottomColor={
                  colors?.bottomColor ? colors.bottomColor : undefined
                }
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
                bottomColor={
                  colors?.bottomColor ? colors.bottomColor : undefined
                }
                sideColor={`linear-gradient(${
                  colors?.cardColor || "transparent"
                }, ${colors?.cardDarkerColor || "transparent"})`}
                border="2px solid var(--light-color)"
              />
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default ProfilePage;
