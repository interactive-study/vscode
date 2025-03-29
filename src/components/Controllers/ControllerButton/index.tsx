import React from 'react';
import styles from './ControllerButton.module.css';

interface ControllerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  handleClick?: () => void;
}

export default function ControllerButton({
  title,
  handleClick,
  ...props
}: ControllerButtonProps) {
  return (
    <button className={styles.buttonContainer} onClick={handleClick} {...props}>
      <span className={styles.contentContainer}>{title}</span>
    </button>
  );
}
