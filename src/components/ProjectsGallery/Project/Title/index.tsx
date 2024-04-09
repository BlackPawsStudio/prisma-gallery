import HoloFrame from '../../../HologramFrame';
import styles from './index.module.css';

interface TitleSideProps {
  title: string;
  image: string;
}

const ProjectTitleSide = ({ title, image }: TitleSideProps) => (
  <div className={styles['container']}>
    <HoloFrame
      light
      style={{
        width: '90%',
        padding: '5px',
        textAlign: 'center',
      }}
    >
      <h4>{title}</h4>
    </HoloFrame>
  </div>
);

export default ProjectTitleSide;
