import { useState } from 'react';
import { useTabsContext } from '../../../contexts/TabsContext';
import ControllerButton from '../ControllerButton';

export default function ResetButton() {
  const { resetTabs } = useTabsContext();
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleReset = () => {
    if (clickCount === 0) {
      alert("Life isn't a video game, there's no reset button :)");
      setClickCount((prevCount) => prevCount + 1);
    } else if (clickCount === 1) {
      alert("Told you.. stop bothering!");
      setClickCount((prevCount) => prevCount + 1);
    }else {
      alert("Alright, alright... but this is a one-time deal!");
      resetTabs();
      setClickCount(0);
    }
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
