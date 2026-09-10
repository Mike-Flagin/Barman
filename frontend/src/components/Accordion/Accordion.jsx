import React, {useState} from 'react';
import style_arrow from "../Icons/style_icons.module.css";
import Arrow from "../../assets/vector_arrow.svg";
import styles from './Accordion.module.css';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.title - Accordion title
 * @param {boolean} [props.initialOpen=false] - Initial state (opened, closed)
 * @param {React.ReactNode} [props.children] - Accordion body
 */

export default function Accordion({title, initialOpen = false, children}) {
    const [isOpen, setOpen] = useState(initialOpen);

    const toggleAccordion = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div className={styles.accordion}>
            <button
                type="button"
                className={styles.header}
                onClick={toggleAccordion}>
                <span className={styles.title}>{title}</span>
                <img
                    src={Arrow}
                    alt=""
                    aria-hidden="true"
                    className={`${styles.icon} ${isOpen ? styles.iconOpen : ''} ${style_arrow.vectorArrow || ''}`}
                />
            </button>

            <div className={`${styles.contentWrapper} ${isOpen ? styles.open : ''}`}>
                <div className={styles.contentInner}>
                    <div className={styles.body}>{children}</div>
                </div>
            </div>
        </div>
    );
}