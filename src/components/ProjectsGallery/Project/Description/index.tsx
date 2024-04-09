import ReactMarkdown from 'react-markdown';
import { DemoType } from '../../../../utils/data';
import HoloFrame from '../../../HologramFrame';
import styles from './index.module.css';

interface DescriptionProps {
  data: DemoType;
}

const ProjectDescription = ({ data }: DescriptionProps) => {
  return (
    <div className={styles['container']}>
      <HoloFrame
        style={{
          width: '95%',
          height: '95%',
        }}
      >
        <div className={styles['content-wrapper']}>
          <div className={styles['content']}>
            <ReactMarkdown>{data.description}</ReactMarkdown>
          </div>
        </div>
        <a className={styles['url-container']} href={data.url} target="blank">
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
      </HoloFrame>
    </div>
  );
};

export default ProjectDescription;
