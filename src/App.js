import styles from './App.module.css';
import React, { useState, useEffect } from 'react';

import { XButton } from './components/ui/Button/XButton';
import { XIcon } from './components/ui/Icon/XIcon';
import { XInput } from './components/ui/Input/XInput';

import { ref, onValue, set, remove, push } from 'firebase/database';
import { db } from './firebase';


function App({endpoint = ''}) {
  const [todos, setTodos] = useState({});
  const [computedTodos, setComputedTodos] = useState([]); 
  const [title, setTile] = useState('');
  const [find, setFind] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [sort, setSort] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const todoDBRef = ref(db, 'todo');
    return onValue(todoDBRef, (snapshot) => {
        const loadedTodos = snapshot.val();
        setTodos(loadedTodos || {});
        setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    let newTodos = Object.entries(todos).map(([id, {title}]) => ({id, title}));
    if (find) {
      newTodos = newTodos.filter(todo => todo.title.includes(find));
    }
    if (sort === 'asc') {
      newTodos.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'desc') {
      newTodos.sort((a, b) => b.title.localeCompare(a.title))
    }
    setComputedTodos(newTodos);
  }, [todos, find, sort]);


  const onClickSort = (event) => {
    if (sort === 'asc') {
      setSort('desc')
    } else if (sort === 'desc') {
      setSort(false)
    } else {
      setSort('asc')
    }
  }
  const onChangeFind = (event) => {
    setFind(event.target.value);
  }
  const headerDelete = (id) => {
    setIsDeleting(true);
    setIsLoading(true);
    const todoDBRef = ref(db, `todo/${id}`);
    remove(todoDBRef)
      .then((res) => {
        console.log('Уален!', res)
      })
      .finally(() => setIsDeleting(false));
  }
  const headerUpdate = (id) => {
    setSelectedId(id);
    setTile(todos[id].title);
  }
  const onChangeTitle = (event) => {
    setTile(event.target.value);
  }
  const onKeyPressTitle = (event) => {
    if (event.key === 'Enter') {
      if (selectedId) {
        setIsUpdating(true)
        const todoDBRef = ref(db, `todo/${selectedId}`);
        set(todoDBRef, {title})
          .then((res) => {
            console.log('Изменен!', res);
            setTile('');
            setSelectedId(null);
          })
          .finally(() => setIsUpdating(false));
      } else if (title.trim()) {
        setIsCreating(true);
        setIsLoading(true);
        const todoDBRef = ref(db, 'todo');
        push(todoDBRef, {title})
          .then((res) => {
            console.log('Создан!', res);
            setTile('');
          })
          .finally(() => setIsCreating(false));
      }
    }
  }
  return (<div className={styles.app}>
    <div className={styles.container}>
    <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-7'>
          <XInput value={title} label="Добавить" onChange={onChangeTitle} onKeyPress={onKeyPressTitle} placeholder="Введите дело" />
        </div>
        <div className='col-span-4'>
          <XInput value={find} label="Найти" onChange={onChangeFind} placeholder="Что ищим?" />
        </div>
        <div className='col-span-1'>
          <XButton icon={true} onClick={onClickSort}>
            <XIcon>{
              sort === 'asc'?'mdi-sort-ascending': sort === 'desc'? 'mdi-sort-descending': 'mdi-sort'
            }</XIcon>
          </XButton>
        </div>
      </div>
      {
      isLoading? 
      <div className={styles.loader}></div>:
      <> 
        <h2 className={styles['list-heading']}>Список:</h2>
        {!computedTodos.length && <p className="text-center text-9xl">Пусто</p>}
        <ul className={styles.list}>
          {computedTodos.map(({ id, title }) => {
            return <li key={id} className={styles['list-item']}>
              {title}
              <div className={styles.actions}>
                <XButton disabled={isUpdating} color="secondary" size="xs" onClick={() => {headerUpdate(id, title)}} title="Изменить">
                  <XIcon>mdi-note-edit-outline</XIcon>
                </XButton>
                <XButton disabled={isDeleting} color="danger" size="xs" onClick={() => {headerDelete(id)}} title="Удалить">
                  <XIcon>mdi-note-remove-outline</XIcon>
                </XButton>
              </div>
            </li>
          })}
        </ul>
      </>
    }
    </div>
  </div >)
}

export default App;
