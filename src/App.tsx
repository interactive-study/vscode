import styles from './styles/App.module.css';
import Editor from './components/Editor';
import Reflection from './components/Reflection';
import { CodeProvider } from './contexts/CodeContext';

function App() {
  return (
    <>
      <CodeProvider>
        <div className={styles.container}>
          <Editor />
          <Reflection />
        </div>
      </CodeProvider>
    </>
  );
}

export default App;
