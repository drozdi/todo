import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../App.module.css';

import { XButton } from '../components/ui/Button/XButton.js';
import { XIcon } from '../components/ui/Icon/XIcon.js';
import { XInput } from '../components/ui/Input/XInput.js';

import todoRepository from '../repositories/todoRepository.js';

export function TodosPage () {
	const [todos, setTodos] = useState([]);
  const [title, setTile] = useState('');
  const [find, setFind] = useState('');
  const [sort, setSort] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
    setIsLoading(true);
    todoRepository.list()
      .then(res => res.json())
      .then(setTodos)
      .finally(() => setIsLoading(false))
  }, [refresh]);

  const computedTodos = useMemo(() => {
    let newTodos = [...todos];
    if (find) {
      newTodos = newTodos.filter(todo => todo.title.includes(find));
    }
    if (sort === 'asc') {
      newTodos.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'desc') {
      newTodos.sort((a, b) => b.title.localeCompare(a.title))
    }
    return newTodos;
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

  const onChangeTitle = (event) => {
    setTile(event.target.value);
  }
  const onKeyPressTitle = (event) => {
    if (event.key === 'Enter') {
      todoRepository.post({title: title.trim()})
        .then(res => res.json())
        .then((res) => {
          console.log('Создан!', res);
          setTile('');
          setRefresh(!refresh);
        });
    }
  }
	
	return (<>
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
              <NavLink to={`/todo/${id}`}>{title}</NavLink>
            </li>
          })}
        </ul>
      </>
    }
    </>)
}