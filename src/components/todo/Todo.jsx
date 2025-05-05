import { useState } from 'react';
import { useTodos } from '../../store/todos';
import { XBtn, XIcon, XInput } from '../ui';
import styles from './Todo.module.css';
export function Todo({ id, title }) {
	const [newTitle, setNewitTitle] = useState(title);
	const { editId, setEditId, error, remove, update } = useTodos();
	const isEditing = editId === id;
	const onDelete = () => {
		if (confirm('Вы уверены, что хотите удалить?')) {
			remove(id);
		}
	};
	const onEdit = () => {
		setEditId(id);
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
		update({ id, title: newTitle });
	};
	const onCancel = () => {
		setEditId(null);
	};
	return (
		<li className={styles.item}>
			{isEditing ? (
				<>
					<XInput
						value={newTitle}
						onChange={onChange}
						onKeyPress={onKeyPress}
					/>
					{error && <p className="text-negative">{error}</p>}
				</>
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
