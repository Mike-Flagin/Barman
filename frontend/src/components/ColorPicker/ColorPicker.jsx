import React, { useState, useRef, useEffect } from 'react';
import { RgbColorPicker } from 'react-colorful';
import styles from './ColorPicker.module.css';


/**
 * @param {Object} props
 * @param {number[]} [props.defaultColor=[255,255,255]] - Initial color
 * @param {function} [props.onColorChange] - Color changed callback, calls when the color picker window is closing
 */
export default function ColorPicker({defaultColor = [255, 255, 255], onColorChange}) {
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState({ r: defaultColor[0], g: defaultColor[1], b: defaultColor[2] });

    const containerRef = useRef(null);
    const colorRef = useRef(color);
    const wasOpenRef = useRef(isOpen);

    // Keep colorRef updated with the latest color state without causing re-renders
    colorRef.current = color;

    // Trigger onColorChange whenever the picker transitions from open -> closed
    useEffect(() => {
        if (wasOpenRef.current && !isOpen) {
            const { r, g, b } = colorRef.current;
            onColorChange?.([r, g, b]);
        }
        wasOpenRef.current = isOpen;
    }, [isOpen, onColorChange]);

    // Close popover when clicking outside the component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);

        };
    }, [isOpen]);

    const handleChannelChange = (channel, rawValue) => {
        const value = Math.max(0, Math.min(255, Number(rawValue) || 0));
        setColor((prev) => ({ ...prev, [channel]: value }));
    };

    const rgbString = `rgb(${color.r}, ${color.g}, ${color.b})`;

    return (
        <div className={styles.wrapper} ref={containerRef}>
            <button
                type="button"
                className={styles.swatch}
                style={{ backgroundColor: rgbString }}
                onClick={() => setIsOpen((prev) => !prev)}
            />

            {isOpen && (
                <div className={styles.popover}>
                    <RgbColorPicker color={color} onChange={setColor} />

                    <div className={styles.inputsRow}>
                        <div className={styles.inputGroup}>
                            <span>R</span>
                            <input
                                type="number"
                                min="0"
                                max="255"
                                value={color.r}
                                onChange={(e) => handleChannelChange('r', e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <span>G</span>
                            <input
                                type="number"
                                min="0"
                                max="255"
                                value={color.g}
                                onChange={(e) => handleChannelChange('g', e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <span>B</span>
                            <input
                                type="number"
                                min="0"
                                max="255"
                                value={color.b}
                                onChange={(e) => handleChannelChange('b', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}