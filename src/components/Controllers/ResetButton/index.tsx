import { useState } from 'react';
import ControllerButton from '../ControllerButton';
import { INITIAL_CODE, useCodeContext } from '../../../contexts/CodeContext';

export default function ResetButton() {
  const { setCode } = useCodeContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleReset = () => {
    setCode(INITIAL_CODE);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <ControllerButton
      title={isHovered ? "reset\nif you're not" : 'reset'}
      handleClick={handleReset}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
