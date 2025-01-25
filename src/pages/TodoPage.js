import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from '../App.module.css';
import { XButton } from "../components/ui/Button/XButton.js";
import { XTextarea } from "../components/ui/Textarea/XTextarea.js";
import todoRepository from '../repositories/todoRepository.js';

export function TodoPage () {
	const [isLoading, setLoading] = useState(true);
	const [stattus, setStattus] = useState('');
	const [isNotFound, setNotFound] = useState(false);
	const [isBtnDisabled, setBtnDisabled] = useState(false);
	const params = useParams();
	const navigate = useNavigate();
	let [todo, setTodo] = useState(null);
	useEffect(() => {
		(async () => {
			try {
				const response = await todoRepository.get(params.id);
				if (response.ok) {
					const json = await response.json();
					setTodo(json);
				} else {
					setNotFound(true);
				}
			} catch (error) {
				setNotFound(true);
			} finally {
				setLoading(false)
			}
		})()
	}, [params])
	if (isLoading) {
		return 
	}
	if (isNotFound) {
		return <Navigate to="/404" />;
	}
	const onInput = ({target}) => {
		stattus && setStattus('');
		setTodo((val) => ({...val, title: target.value}));
	}
	const onSave = async (event) => {
		event.preventDefault();
		setLoading(true);
		setBtnDisabled(true);
		try {
			console.log(todo)
			const response = await todoRepository.put(todo.id, {
				title: todo.title
			});
			if (response.ok) {
				const json = await response.json();
				setTodo(json);
				setStattus('success');
			}
		} catch (error) {
			setStattus('danger');
			console.log(error);
		} finally {
			setLoading(false);
			setBtnDisabled(false);
		}
	}
	const onDelete = async (event) => {
		event.preventDefault();
		if (window.confirm("Точно удалить?") === true) {
			setLoading(true);
			setBtnDisabled(true);
			try {
				const response = await todoRepository.delete(todo.id);
				if (response.ok) {
					navigate(-1);
				}
			} catch (error) {
				setStattus('danger');
				console.log(error);
			} finally {
				setLoading(false);
				setBtnDisabled(false);
			}
		}
	}
	return (<>
		{isLoading? <div className={styles['loader']} />:	null}
		<h2 className="text-xl">#{todo.id}</h2>
		<XTextarea className={stattus? `border-${stattus}` :''} onChange={onInput} rows={10}>{todo.title}</XTextarea>
		<div className="space-x-3">
			<XButton className='float-left' disabled={isBtnDisabled} color="secondary" onClick={() => navigate(-1)}>Back</XButton>
			<XButton className='float-right' disabled={isBtnDisabled} color="success" onClick={onSave}>Save</XButton>
			<XButton className='float-right' disabled={isBtnDisabled} color="danger" onClick={onDelete}>Delete</XButton>
		</div>
	</>);
}