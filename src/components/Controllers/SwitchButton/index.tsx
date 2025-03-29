import { useState } from 'react';
import ControllerButton from '../ControllerButton';
import { useThemeContext } from '../../../contexts/ThemeContext';

export default function SwitchButton() {
  const { toggleTheme } = useThemeContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    toggleTheme();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <ControllerButton
      title={isHovered ? "switch\nif you're sure" : 'switch'}
      handleClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
