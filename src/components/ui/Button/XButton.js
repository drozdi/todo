import styles from './XButton.module.css';
import classNames from 'classnames';
import {XIcon} from '../Icon/XIcon';

// todo add icon support for iconRight
export function XButton ({children, color, rounded, size, block, icon, iconRight, disabled, className, ...props}) {
    const attrs = {
        type: 'button',
        ...props,
        className: classNames(className, {
            [styles['x-btn']]: true,
            [styles[`x-btn--${color}`]]: !!color,
            [styles[`x-btn--${size}`]]: !!size,
            [styles['x-btn--icon']]: !!icon,
            [styles['x-btn--rounded']]: !!rounded,
            [styles['x-btn--block']]: !!block
        })
    }

    if (disabled) {
        attrs.disabled = true;
        attrs['aria-disabled'] = 'true'
    } 
    if (props.href === void 0) {
        attrs.role = 'button'
    }

    return (<button {...attrs}>
        {children}
    </button>);
}