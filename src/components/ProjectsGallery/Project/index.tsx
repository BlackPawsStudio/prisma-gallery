import { DemoType } from '../../../utils/data';
import styles from './index.module.css';
import HoloFrame from '../../HologramFrame';

interface ProjectProps {
  data: DemoType;
  zoom: () => void;
  isZoomed: boolean;
}

const Project = ({ data, zoom, isZoomed }: ProjectProps) => {
  return (
    <div className={styles['container']} onClick={zoom}>
      <div
        className={`button ${styles['side-placeholder']}`}
        style={{
          opacity: isZoomed ? 0 : 1,
        }}
      >
        <HoloFrame
          light
          style={{
            width: '100%',
            height: '100%',
            padding: '5px',
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >
          <h4 className={styles['title']}>{data.name}</h4>
          <img className={styles['img']} src={data.image} alt='img' />
        </HoloFrame>
      </div>
    </div>
  );
};

export default Project;
