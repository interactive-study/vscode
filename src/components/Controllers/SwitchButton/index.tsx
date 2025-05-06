import { useState } from 'react';
import ControllerButton from '../ControllerButton';

export default function SwitchButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    alert("Life isn't a walk in the park, kiddo :)");
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
