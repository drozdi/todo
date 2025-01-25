import classNames from 'classnames';
import styles from '../Input//XInput.module.css';
//todo add styles label over border
export function XTextarea ({children, className, type = 'text', label = '', ...props}) {
  return (<div className={styles['x-input__wrap']}>
    <textarea
      className={classNames(className, styles['x-input'])}
      {...props}>
        {children}
        </textarea>
    {!!label && <label
      className={styles['x-input__label']}>
        {label}
    </label>}
  </div>)
}