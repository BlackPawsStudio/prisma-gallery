import { IImage } from '@/utils/types';

interface ImageSlideProps {
  data: IImage;
}

export const ImageSlide = ({ data }: ImageSlideProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <img src={data.url} alt={data.title} className="h-full" />
      <div className="absolute border-light border bottom-[5vh] left-1/2 -translate-x-1/2 bg-gradient-to-r from-main via-transparent to-main px-[5vh] py-[2vh] rounded-full">
        {data.title}
      </div>
    </div>
  );
};
