import styles from './Celestial.module.css';
import { useThemeContext } from '../../contexts/ThemeContext';
import Sun from './Sun';
import Moon from './Moon';

export default function Celestial() {

  const { theme, toggleTheme } = useThemeContext();
  const sunText = theme === 'consciousness' ? 'bye sun' : 'hello sun';

  return (
    <div className={styles.container}>
      <Sun />
      <div className={styles.blind} onClick={toggleTheme}>
        <span>{sunText}</span>
      </div>
      <Moon />
    </div>
  );
}
