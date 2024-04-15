import { IUser } from '@/utils/types';

interface TitleSlideProps {
  data: IUser;
}

export const TitleSlide = ({ data }: TitleSlideProps) => {
  return (
    <div className='w-full h-full flex flex-col items-center p-[10vh] gap-[7vh]'>
      <h2 className='text-[10vh]'>{data.name}</h2>
      <p className='text-[4vh]'>{data.description}</p>
    </div>
  );
};
