import { useRef, useEffect } from 'react';
import { useCodeContext } from '../../contexts/CodeContext';

import styles from './Editor.module.css';
import { insanitize, sanitize } from '../../insanity';
import { useThemeContext } from '../../contexts/ThemeContext';

export default function Editor() {
  const { code, setCode } = useCodeContext();
  const { theme } = useThemeContext();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const caretPositionRef = useRef<number>(100);

  const lines = code.split('\n');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { selectionStart, selectionEnd } = e.currentTarget;

    if (e.key === 'Tab') {
      e.preventDefault();

      const newCode = `${code.substring(0, selectionStart)}  ${code.substring(selectionEnd)}`;
      setCode(newCode);

      caretPositionRef.current = selectionStart + 2;
    } else if (e.key === 'Backspace') {
      if (selectionStart === selectionEnd) {
        caretPositionRef.current = Math.max(selectionStart - 1, 0);
      } else {
        caretPositionRef.current = selectionStart;
      }
    } else if (e.key === 'Delete') {
      if (selectionStart === selectionEnd) {
        caretPositionRef.current = selectionStart;
      } else {
        caretPositionRef.current = selectionStart;
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();

      const currentLine =
        code.substring(0, selectionStart).split('\n').pop() || '';
      const indent = currentLine.match(/^\s*/)?.[0] || '';
      const newCode =
        code.substring(0, selectionStart) +
        '\n' +
        indent +
        code.substring(selectionEnd);

      setCode(newCode);
      caretPositionRef.current = selectionStart + 1 + indent.length;
    } else {
      caretPositionRef.current = selectionStart + 1;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
        caretPositionRef.current;
    }
  }, [code]);

  const sane = sanitize(code);
  const insane = insanitize(code, sane);

  return (
    <div className={styles.container}>
      <section className={styles.cubeFaceFront}>
        <div className={styles.lineNumContainer}>
          {lines.map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
        <textarea
          ref={textAreaRef}
          className={styles.textarea}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
        />
        {theme === 'subconsciousness' && (
          <div className={styles.display}>
            {code.split('').map((text, i) => {
              if (text)
                if (insane.some(({ index }) => index === i)) {
                  return <span className={styles.repressed}>{text}</span>;
                }
              return text;
            })}
          </div>
        )}
      </section>

      <section className={styles.cubeFaceSide} />
    </div>
  );
}
