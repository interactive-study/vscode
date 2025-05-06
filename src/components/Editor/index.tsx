import { useEffect, useRef } from 'react';
import { useCodeContext } from '../../contexts/CodeContext';

import XIconUrl from '../../assets/icons/x.svg';
import { useTabsContext } from '../../contexts/TabsContext';
import { useThemeContext } from '../../contexts/ThemeContext';
// import { insanitize, sanitize } from '../../insanity';
import styles from './Editor.module.css';

export default function Editor() {
  const { tabs, setTabs, currentTabIndex, setCurrentTabIndex } =
    useTabsContext();
  const { code, setCode } = useCodeContext();
  const { theme } = useThemeContext();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const caretPositionRef = useRef<number>(100);
  const codeBuffer = useRef<string | null>(null);

  const beforeInputEventHandler = (e: InputEvent) => {
    if (!e || !e.currentTarget) return;
    const currentTarget = e.currentTarget as HTMLTextAreaElement;

    const prevCode = currentTarget.value;
    let c = '';
    for (
      let leftOpen = currentTarget.selectionStart - 1;
      leftOpen >= 0;
      leftOpen--
    ) {
      c = prevCode[leftOpen];
      if (c === '\n' || c === '>') break;
      if (c === '<') {
        for (
          let leftClose = currentTarget.selectionEnd;
          leftClose < prevCode.length;
          leftClose++
        ) {
          c = prevCode[leftClose];
          if (c === '<' || c === '\n') break;
          if (c === '>') {
            for (
              let rightOpen = leftClose + 1;
              rightOpen < prevCode.length;
              rightOpen++
            ) {
              c = prevCode[rightOpen];
              if (c === '>') break;
              if (c === '/' && prevCode[rightOpen - 1] === '<') {
                const rightClose = rightOpen + (leftClose - leftOpen);
                if (
                  prevCode.substring(leftOpen + 1, leftClose) ===
                  prevCode.substring(rightOpen + 1, rightClose)
                ) {
                  const relativeStart = currentTarget.selectionStart - leftOpen;
                  const relativeEnd = currentTarget.selectionEnd - leftOpen;

                  if (e.inputType === 'insertText') {
                    codeBuffer.current =
                      prevCode.substring(0, currentTarget.selectionStart) +
                      e.data +
                      prevCode.substring(
                        currentTarget.selectionEnd,
                        rightOpen + relativeStart
                      ) +
                      e.data +
                      prevCode.substring(rightOpen + relativeEnd);
                  } else if (e.inputType === 'deleteContentBackward') {
                    codeBuffer.current =
                      prevCode.substring(0, currentTarget.selectionStart - 1) +
                      prevCode.substring(
                        currentTarget.selectionEnd,
                        rightOpen + relativeStart - 1
                      ) +
                      prevCode.substring(rightOpen + relativeEnd);
                  }
                  break;
                }
              }
            }
            break;
          }
        }
      }
    }
    if (e.data === '<') {
      codeBuffer.current =
        currentTarget.value.substring(0, currentTarget.selectionStart) +
        '<></>' +
        currentTarget.value.substring(currentTarget.selectionEnd);
    }
  };

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
    setCode(codeBuffer.current ?? e.currentTarget.value);
    codeBuffer.current = null;
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
        caretPositionRef.current;
    }
    textAreaRef.current?.addEventListener(
      'beforeinput',
      beforeInputEventHandler
    );
    return () => {
      textAreaRef.current?.removeEventListener(
        'beforeinput',
        beforeInputEventHandler
      );
    };
  }, [code]);

  // const sane = sanitize(code);
  // const insane = insanitize(code, sane);

  return (
    <div className={styles.container}>
      <section className={styles.cubeFaceFront}>
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`${styles.tab} ${index === currentTabIndex ? styles.selected : ''}`}
              onClick={() => {
                setCurrentTabIndex(index);
              }}
            >
              <span>{tab.title}</span>
              <div
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  const newTabs = tabs.filter((_, i) => i !== index);
                  setTabs(newTabs);
                  if (index === currentTabIndex) {
                    setCurrentTabIndex(Math.max(index - 1, 0));
                  }
                }}
              >
                <img src={XIconUrl} width={16} height={16} />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.editor}>
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
            readOnly={theme === 'subconsciousness'}
          />
          {/* {theme === 'subconsciousness' && (
            <div className={styles.display}>
              {code.split('').map((text, i) => {
                if (text)
                  if (insane.some(({ index }) => index === i)) {
                    return <span className={styles.repressed}>{text}</span>;
                  }
                return text;
              })}
            </div>
          )} */}
        </div>
      </section>

      <section className={styles.cubeFaceSide} />
    </div>
  );
}
