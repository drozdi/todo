import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { NotFoundPage } from './pages/NotFoundPage.js';
import { TodoPage } from './pages/TodoPage.js';
import { TodosPage } from './pages/TodosPage.js';



function App({endpoint = ''}) {
  return (<div className={styles.app}>
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/todo/:id" element={<TodoPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  </div>)
}

export default App;
