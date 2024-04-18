import { IImage } from "@/utils/types";

interface ImageElProps {
  data: IImage;
  removeImage: (id: string) => void;
}

export const ImageEl = ({ data, removeImage }: ImageElProps) => {
  return (
    <div className="rounded-2xl overflow-hidden h-full relative flex flex-col">
      <img src={data.url} alt={data.title} className="h-full max-w-7xl" />
      <div className="bg-white w-full absolute bottom-0 text-black text-center overflow-y-auto">
        {data.title}
        <button
          className="absolute top-1/2 -translate-y-1/2 right-1 hover:scale-110 w-5 h-5"
          onClick={() => removeImage(data.id)}
        >
          <div className="absolute bg-black w-[3px] h-5 rounded-full rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
          <div className="absolute bg-black w-[3px] h-5 rounded-full -rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
        </button>
      </div>
    </div>
  );
};
