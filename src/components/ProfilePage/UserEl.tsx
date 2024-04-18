import { IUser } from "@/utils/types";
import { ImageEl } from "./ImageEl";
import { useCallback, useState } from "react";

interface UserElProps {
  data: IUser;
  removeUser: (id: string) => void;
}

export const UserEl = ({ data, removeUser }: UserElProps) => {
  const [images, setImages] = useState(data.images);

  const removeImage = useCallback(
    (id: string) => {
      const newImages = images?.filter((el) => el.id !== id);
      setImages(newImages);
      fetch(`/api/images/${id}`, {
        method: "DELETE",
      });
    },
    [images]
  );

  return (
    <div className="border-black border-2 rounded-3xl p-5 bg-white flex flex-col gap-5">
      <div className="flex justify-around border-b-2 border-black pb-3">
        <div>{data.id}</div>
        <div>{data.name}</div>
        <div>
          {data.description || (
            <label className="text-gray-500">No description</label>
          )}
        </div>
        <div>
          <button
            className="hover:scale-110 w-5 h-5 relative"
            onClick={() => removeUser(data.id)}
          >
            <div className="absolute bg-black w-[3px] h-5 rounded-full rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
            <div className="absolute bg-black w-[3px] h-5 rounded-full -rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
          </button>
        </div>
      </div>
      {images && images?.length === 0 ? (
        <div className="w-full h-24 flex items-center text-center">
          No images
        </div>
      ) : (
        <div className="overflow-x-auto h-52 w-full">
          <div className="h-full w-fit flex gap-5">
            {images?.map((el, idx) => (
              <ImageEl data={el} key={idx} removeImage={removeImage} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
