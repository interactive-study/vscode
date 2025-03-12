import { useCodeContext } from '../../contexts/CodeContext';
import styles from './Reflection.module.css';

export default function Reflection() {
  const { code } = useCodeContext();

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.reflection}
          dangerouslySetInnerHTML={{ __html: code }}
        ></div>
      </div>
    </>
  );
}
