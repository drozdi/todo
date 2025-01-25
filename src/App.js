import styles from './App.module.css';
import React, { useState, useEffect } from 'react';

function App({endpoind}) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(endpoind)
      .then(res => res.json())
      .then(data => setTodos(data))
      .finally(() => setIsLoading(false))
  }, [endpoind]);

  return (<div className={styles.app}>
    <div className={styles.container}>
      {
      isLoading? 
      <div className={styles.loader}></div>:
      <> 
        <h2 className={styles['list-heading']}>Список:</h2>
        {!todos.length && <p>Нет элементов</p>}
        <ul className={styles.list}>
          {todos.map(({ id, title }) => {
            return <li key={id} className={styles['list-item']}>{title}</li>
          })}
        </ul>
      </>
    }
    </div>
  </div >)
}

export default App;
