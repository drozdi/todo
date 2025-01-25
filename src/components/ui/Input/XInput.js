import styles from './XInput.module.css';
//todo add styles label over border
export function XInput({type = 'text', label = '', ...props}) {
  return (<div className={styles['x-input__wrap']}>
    <input
      type={type}
      className={styles['x-input']}
      {...props} />
    {!!label && <label
      className={styles['x-input__label']}>
        {label}
    </label>}
  </div>)
}