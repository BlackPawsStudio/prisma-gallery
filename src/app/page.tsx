import Prism from '@/components/Prism';
import './globals.css';

const HomePage = () => {
  return (
    <div className="absolute w-screen h-screen flex items-center justify-center" style={{
      perspective: '500px',
    }}>
      <Prism
        sides={new Array(12).fill('').map((_, id) => (
          <div className='bg-white w-full h-full flex items-center justify-center text-white' key={id}>{id}</div>
        )).reverse()}
        height={250}
        width={300}
        showTile={2}
        border="2px solid #000"
      />
    </div>
  );
};

export default HomePage;
