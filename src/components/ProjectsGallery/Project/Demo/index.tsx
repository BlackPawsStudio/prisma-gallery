import { useState } from 'react';
import HoloFrame from '../../../HologramFrame';
import styles from './index.module.css';

interface ProjectLinkProps {
  link: string;
  image: string;
}

const ProjectDemo = ({ link, image }: ProjectLinkProps) => {
  const [isDemo, setIsDemo] = useState(false);

  return (
    <>
      <a className={styles['container']} href={link} target="blank">
        <HoloFrame
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            margin: '0 auto',
            width: 'fit-content',
            padding: '5px',
            overflow: 'hidden',
            background: 'var(--main-color)',
            fontSize: '14px',
            zIndex: 4,
            backfaceVisibility: 'hidden',
          }}
        >
          Open in new tab
        </HoloFrame>
      </a>
      {isDemo ? (
        <iframe className={styles['iframe']} title="Project demo" src={link} />
      ) : (
        <div className={styles['preload-text']} onClick={() => setIsDemo(true)}>
          <img className={styles['iframe']} src={image} alt={'demo'} />
          <HoloFrame
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              margin: '0 auto',
              width: 'fit-content',
              padding: '15px 25px',
              background: 'var(--main-color)',
              transform: 'translateY(-50%) translateX(-50%)',
              fontSize: '20px',
              zIndex: 4,
              backfaceVisibility: 'hidden',
            }}
          >
            Load
          </HoloFrame>
        </div>
      )}
    </>
  );
};

export default ProjectDemo;
