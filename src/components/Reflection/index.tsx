import { useCodeContext } from '../../contexts/CodeContext';
import styles from './Reflection.module.css';
import DOMPurify from 'dompurify';

export default function Reflection() {
  const { code } = useCodeContext();

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.reflection}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(code) }}
        ></div>
      </div>
    </>
  );
}
