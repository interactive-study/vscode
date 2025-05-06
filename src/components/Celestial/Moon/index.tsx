import { useEffect, useRef } from 'react';
import styles from './Moon.module.css';
import { useThemeContext } from '../../../contexts/ThemeContext';

export default function Moon() {
  const paths = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['M7 12H10V13L8.5 14H10V15H7V14L8.5 13H7V12Z', '', ''],
    ['M9 11H12V12L10.5 13H12V14H9V13L10.5 12H9V11Z', '', ''],
    ['M10 9H13V10L11.5 11H13V12H10V11L11.5 10H10V9Z', '', ''],
    [
      'M12 8H15V9L13.5 10H15V11H12V10L13.5 9H12V8Z',
      'M8 12H11V13L9.5 14H11V15H8V14L9.5 13H8V12Z',
      '',
    ],
    [
      'M12 7H15V8L13.5 9H15V10H12V9L13.5 8H12V7Z',
      'M9 11H12V12L10.5 13H12V14H9V13L10.5 12H9V11Z',
      '',
    ],
    [
      'M13 5H16V6L14.5 7H16V8H13V7L14.5 6H13V5Z',
      'M11 10H14V11L12.5 12H14V13H11V12L12.5 11H11V10Z',
      'M6 12H9V13L7.5 14H9V15H6V14L7.5 13H6V12Z',
    ],
    [
      'M15 4H18V5L16.5 6H18V7H15V6L16.5 5H15V4Z',
      'M12 8H15V9L13.5 10H15V11H12V10L13.5 9H12V8Z',
      'M8 11H11V12L9.5 13H11V14H9.5H8V13L9.5 12H8V11Z',
    ],
    [
      'M17 3H20V4L18.5 5H20V6H17V5L18.5 4H17V3Z',
      'M12 6H15V7L13.5 8H15V9H12V8L13.5 7H12V6Z',
      'M9 10H12V11L10.5 12H12V13H10.5H9V12L10.5 11H9V10Z',
    ],
    [
      'M18 2H21V3L19.5 4H21V5H18V4L19.5 3H18V2Z',
      'M14 5H17V6L15.5 7H17V8H15.5H14V7L15.5 6H14V5Z',
      'M10 8H13V9L11.5 10H13V11H11.5H10V10L11.5 9H10V8Z',
    ],
    [
      'M18 1H21V2L19.5 3H21V4H18V3L19.5 2H18V1Z',
      'M15 5H18V6L16.5 7H18V8H16.5H15V7L16.5 6H15V5Z',
      'M10 7H13V8L11.5 9H13V10H11.5H10V9L11.5 8H10V7Z',
    ],
    [
      'M19 0H22V1L20.5 2H22V3H19V2L20.5 1H19V0Z',
      'M17 5H20V6L18.5 7H20V8H18.5H17V7L18.5 6H17V5Z',
      'M11 6H14V7L12.5 8H14V9H12.5H11V8L12.5 7H11V6Z',
    ],
    [
      '',
      'M17 4H20V5L18.5 6H20V7H18.5H17V6L18.5 5H17V4Z',
      'M12 6H15V7L13.5 8H15V9H13.5H12V8L13.5 7H12V6Z',
    ],
    [
      '',
      'M18 3H21V4L19.5 5H21V6H19.5H18V5L19.5 4H18V3Z',
      'M12 5H15V6L13.5 7H15V8H13.5H12V7L13.5 6H12V5Z',
    ],
    [
      '',
      'M19 1H22V2L20.5 3H22V4H20.5H19V3L20.5 2H19V1Z',
      'M13 4H16V5L14.5 6H16V7H14.5H13V6L14.5 5H13V4Z',
    ],
    ['', '', 'M15 3H18V4L16.5 5H18V6H16.5H15V5L16.5 4H15V3Z'],
    ['', '', 'M16 1H19V2L17.5 3H19V4H17.5H16V3L17.5 2H16V1Z'],
    ['', '', 'M17 0H20V1L18.5 2H20V3H18.5H17V2L18.5 1H17V0Z'],
  ];
  const zPathRef = useRef<SVGPathElement | null>(null);
  const zzPathRef = useRef<SVGPathElement | null>(null);
  const zzzPathRef = useRef<SVGPathElement | null>(null);
  const themeContext = useThemeContext();

  useEffect(() => {
    let lastUpdated = 0;
    let currentIndex = 0;
    let active = false;
    const interval = 500;

    const animateSun = () => {
      if (!active) return;
      const now = Date.now();
      const delta = now - lastUpdated;
      if (delta < interval) {
        requestAnimationFrame(animateSun);
        return;
      } else {
        zPathRef.current?.setAttribute('d', paths[currentIndex][0]);
        zzPathRef.current?.setAttribute('d', paths[currentIndex][1]);
        zzzPathRef.current?.setAttribute('d', paths[currentIndex][2]);

        currentIndex = (currentIndex + 1) % paths.length;
        lastUpdated = now;
        requestAnimationFrame(animateSun);
      }
    };

    const startAnimation = () => {
      currentIndex = 0;
      active = true;
      animateSun();
    };

    const stopAnimation = () => {
      active = false;
    }

    themeContext.addEventListener('subconsciousness', startAnimation);
    themeContext.addEventListener('consciousness', stopAnimation);

    return () => {
      active = false;
      themeContext.removeEventListener('subconsciousness', startAnimation);
      themeContext.removeEventListener('consciousness', stopAnimation);
    };
  }, []);

  return (
    <svg
      className={styles.moon}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path ref={zPathRef} d={paths[0][0]} fill="white" />
      <path ref={zzPathRef} d={paths[0][0]} fill="white" />
      <path ref={zzzPathRef} d={paths[0][0]} fill="white" />
      <path
        d="M7 0H9V1H8V2H7V4H6V10H7V12H8V13H9V14H10V15H12V16H19V15H20V14H21V13H22V15H21V17H20V18H19V19H18V20H16V21H13V22H9V21H6V20H5V19H4V18H3V17H2V16H1V13H0V8H1V6H2V4H3V3H4V2H5V1H7V0Z"
        fill="white"
      />
    </svg>
  );
}
