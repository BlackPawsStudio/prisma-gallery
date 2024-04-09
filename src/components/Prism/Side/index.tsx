import { CSSProperties, ReactNode } from 'react';
import styles from './index.module.css';

interface SideProps {
  customStyle?: CSSProperties;
  children?: ReactNode | ReactNode[];
}

const Side = ({ customStyle, children }: SideProps) => {
  return (
    <div className={styles['container']} style={customStyle}>
      {children}
    </div>
  );
};

export default Side;
