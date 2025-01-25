import styles from './App.module.css';
import React, { useState, useEffect } from 'react';

import { XButton } from './components/ui/Button/XButton';
import { XIcon } from './components/ui/Icon/XIcon';
import { XInput } from './components/ui/Input/XInput';

import { BaseRepository } from './utils/BaseRepository.js'
import { debounce } from './utils/debounce.js'


function App({endpoint = ''}) {
  const [todos, setTodos] = useState([]);
  const [computedTodos, setComputedTodos] = useState([]); 
  const [title, setTile] = useState('');
  const [find, setFind] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [sort, setSort] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const repository = new BaseRepository(endpoint);
  
  useEffect(() => {
    setIsLoading(true);
    repository.list()
      .then(res => res.json())
      .then(setTodos)
      .finally(() => setIsLoading(false))
  }, [refresh]);

  useEffect(() => {
    let newTodos = [...todos];
    if (find) {
      newTodos = newTodos.filter(todo => todo.title.includes(find));
    }
    if (sort === 'asc') {
      newTodos.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'desc') {
      newTodos.sort((a, b) => b.title.localeCompare(a.title))
    }
    setComputedTodos(newTodos);
  }, [todos, find, sort])


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
    setIsDeleting(true)
    repository.delete(id)
      .then(res => res.json())
      .then((res) => {
        console.log('Уален!', res)
        setRefresh(!refresh)
      })
      .finally(() => setIsDeleting(false));
  }
  const headerUpdate = (id) => {
    setSelectedId(id);
    for (let todo of todos) {
      if (todo.id === id) {
        setTile(todo.title);
        break;
      }
    }
  }
  const onChangeTitle = (event) => {
    setTile(event.target.value);
  }
  const onKeyPressTitle = (event) => {
    if (event.key === 'Enter') {
      if (selectedId) {
        setIsUpdating(true)
        repository.put(selectedId, {title})
          .then(res => res.json())
          .then((res) => {
            console.log('Изменен!', res);
            setTile('');
            setSelectedId(null);
            setRefresh(!refresh);
          })
          .finally(() => setIsUpdating(false));
      } else if (title.trim()) {
        setIsCreating(true)
        repository.post({title: title.trim()})
          .then(res => res.json())
          .then((res) => {
            console.log('Создан!', res);
            setTile('');
            setRefresh(!refresh);
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
