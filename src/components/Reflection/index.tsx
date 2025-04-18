import DOMPurify from 'dompurify';
import { useCodeContext } from '../../contexts/CodeContext';
// import { useThemeContext } from '../../contexts/ThemeContext';
// import { insanitize } from '../../insanity';
import styles from './Reflection.module.css';

export default function Reflection() {
  const { code } = useCodeContext();
  // const { theme } = useThemeContext();
  const sane = DOMPurify.sanitize(code);
  // const insane = insanitize(code, sane);

  return (
    <>
      <div className={styles.container}>
        {/* {theme === 'subconsciousness' && (
          <div className={styles.reflection}>
            {insane.map(({ value }) => (
              <span className={styles.fragments}>{value}</span>
            ))}
          </div>
        )} */}
        {/* {theme === 'consciousness' && ( */}
        <div
          className={styles.reflection}
          dangerouslySetInnerHTML={{ __html: sane }}
        />
        {/* )} */}
      </div>
    </>
  );
}
