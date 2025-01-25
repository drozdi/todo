import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPE, delTodoAction, updateTodoAction } from '../../actions';
import { selectEditId, selectIsLoading } from '../../selectors';
import { XBtn, XIcon, XInput } from '../ui';
import styles from './Todo.module.css';
export function Todo({ id, title }) {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const isEditing = useSelector(selectEditId) === id;
	const [newTitle, setNewitTitle] = useState(title);
	const onDelete = () => {
		dispatch(delTodoAction(id));
	};
	const onEdit = () => {
		dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: id });
	};
	const onChange = ({ target }) => {
		setNewitTitle(target.value);
	};
	const onKeyPress = ({ key }) => {
		if (key === 'Enter') {
			onSave();
		}
	};

	const onSave = () => {
		dispatch(updateTodoAction({ id, title: newTitle }));
	};
	const onCancel = () => {
		dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: null });
	};
	return (
		<li className={styles.item}>
			{isEditing ? (
				<XInput value={newTitle} onChange={onChange} onKeyPress={onKeyPress} />
			) : (
				title
			)}
			<div className={styles.actions}>
				{isEditing ? (
					<>
						<XBtn
							color="success"
							size="xs"
							title="Сохранить"
							onClick={onSave}
						>
							<XIcon>mdi-content-save-check-outline</XIcon>
						</XBtn>
						<XBtn color="black" size="xs" title="Отмена" onClick={onCancel}>
							<XIcon>mdi-cancel</XIcon>
						</XBtn>
					</>
				) : (
					<>
						<XBtn
							color="secondary"
							size="xs"
							title="Изменить"
							onClick={onEdit}
						>
							<XIcon>mdi-note-edit-outline</XIcon>
						</XBtn>
						<XBtn color="danger" size="xs" title="Удалить" onClick={onDelete}>
							<XIcon>mdi-note-remove-outline</XIcon>
						</XBtn>
					</>
				)}
			</div>
		</li>
	);
}
