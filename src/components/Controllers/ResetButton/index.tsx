import { useState } from 'react';
import { useTabsContext } from '../../../contexts/TabsContext';
import ControllerButton from '../ControllerButton';

export default function ResetButton() {
  const { resetTabs } = useTabsContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleReset = () => {
    resetTabs();
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
