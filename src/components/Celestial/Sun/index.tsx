import { useEffect, useRef } from 'react';
import styles from './Sun.module.css';

export default function Sun() {
  const paths = [
    'M20 10V9H21V8H22V6H19V5H17V3H16V0H14V1H13V2H12V3H10V2H9V1H8V0H6V3H5V5H3V6H0V8H1V9H2V10H3V12H2V13H1V14H0V16H3V17H5V19H6V22H8V21H9V20H10V19H12V20H13V21H14V22H16V19H17V17H19V16H22V14H21V13H20V12H19V10H20ZM17 14H16V15H15V16H14V17H8V16H7V15H6V14H5V8H6V7H7V6H8V5H14V6H15V7H16V8H17V14Z',
    'M20 12V11H21V10H22V8H19V6H18V1H16V2H15V3H12V2H11V1H10V0H8V3H6V4H1V6H2V7H3V10H2V11H1V12H0V14H3V16H4V21H6V20H7V19H10V20H11V21H12V22H14V19H16V18H21V16H20V15H19V12H20ZM17 14H16V15H15V16H14V17H8V16H7V15H6V14H5V8H6V7H7V6H8V5H14V6H15V7H16V8H17V14Z',
    'M20 14V13H21V12H22V10H21V9H20V8H19V3H14V2H13V1H12V0H10V1H9V2H8V3H3V8H2V9H1V10H0V12H1V13H2V14H3V19H8V20H9V21H10V22H12V21H13V20H14V19H19V14H20ZM17 14H16V15H15V16H14V17H8V16H7V15H6V14H5V8H6V7H7V6H8V5H14V6H15V7H16V8H17V14Z',
    'M20 10V11H21V12H22V14H19V16H18V21H16V20H15V19H12V20H11V21H10V22H8V19H6V18H1V16H2V15H3V12H2V11H1V10H0V8H3V6H4V1H6V2H7V3H10V2H11V1H12V0H14V3H16V4H21V6H20V7H19V10H20ZM17 8H16V7H15V6H14V5H8V6H7V7H6V8H5V14H6V15H7V16H8V17H14V16H15V15H16V14H17V8Z',
  ];
  const sunPathRef = useRef<SVGPathElement | null>(null);
  const currentIndx = useRef(0);

  useEffect(() => {
    let lastUpdated = 0;
    let active = true;
    const interval = 400;

    const animateSun = () => {
      if (!active) return;
      const now = Date.now();
      const delta = now - lastUpdated;
      if (delta < interval) {
        requestAnimationFrame(animateSun);
        return;
      } else if (sunPathRef.current) {
        sunPathRef.current.setAttribute('d', paths[currentIndx.current]);
        currentIndx.current = (currentIndx.current + 1) % paths.length;
        lastUpdated = now;
        requestAnimationFrame(animateSun);
      }
    };

    animateSun();

    return () => {
      active = false;
    };
  });

  return (
    <svg
      className={styles.sun}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path ref={sunPathRef} d={paths[0]} fill="black" />
      <path
        d="M16 9V13H15V14H14V15H13V16H9V15H8V14H7V13H6V9H7V8H8V7H9V6H13V7H14V8H15V9H16Z"
        fill="black"
      />
    </svg>
  );
}
