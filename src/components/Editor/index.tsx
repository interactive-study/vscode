import styles from './Editor.module.css';
import { useState, useRef, useEffect } from 'react';

export default function Editor() {
  const [code, setCode] = useState("console.log('Hello, world!');");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split('\n');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.currentTarget;
      const newCode = `${code.substring(0, selectionStart)}\t${code.substring(selectionEnd)}`;
      setCode(newCode);
      textAreaRef.current!.selectionStart = textAreaRef.current!.selectionEnd =
        selectionStart + 1;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.lineNumContainer}>
        {lines.map((_, index) => (
          <div key={index} className="line-number">
            {index + 1}
          </div>
        ))}
      </div>
      <textarea
        ref={textAreaRef}
        className={styles.textarea}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
