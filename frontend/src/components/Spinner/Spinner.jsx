import {useState} from 'react';
import styles from './style_spinner.module.css'

/**
 * @param {Object} props
 * @param {number} [props.defaultValue] - Начальное значение
 * @param {number} [props.min] - Минимальное значение
 * @param {number} [props.max] - Максимальное значение
 * @param {number} [props.step=1] - Шаг изменения
 * @param {function} [props.onChange] - Колбэк при изменении значения
 */
export default function Spinner({defaultValue, min, max, step = 1, onChange}) {
    const [value, setValue] = useState(defaultValue);

    function handleDecrement() {
        const newValue = value - step;
        if (min !== undefined && newValue < min) return;
        setValue(newValue);
        onChange?.(newValue);
    }

    function handleIncrement() {
        const newValue = value + step;
        if (max !== undefined && newValue > max) return;
        setValue(newValue);
        onChange?.(newValue);
    }

    const isMinReached = min !== undefined && value <= min;
    const isMaxReached = max !== undefined && value >= max;

    return (
        <div className={styles.spinner}>
            <button
                type="button"
                className={styles.button}
                onClick={handleDecrement}
                disabled={isMinReached}
            >
                −
            </button>
            <span className={styles.value}>{value}</span>
            <button
                type="button"
                className={styles.button}
                onClick={handleIncrement}
                disabled={isMaxReached}
            >
                +
            </button>
        </div>
    )
}