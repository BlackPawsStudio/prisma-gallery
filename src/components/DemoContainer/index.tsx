import Prism from '../Prism';

const DemoCont = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          perspective: '500px',
          position: 'absolute',
        }}
      >
        <Prism width={300} height={250} sides={['', '', '', '']} border={'3px solid #000'} />
      </div>
      <div
        style={{
          perspective: '500px',
          position: 'absolute',
        }}
      >
        <Prism width={280} height={240} sides={['', '', '', '']} border={'3px solid #000'} />
      </div>
    </div>
  );
};

export default DemoCont;
