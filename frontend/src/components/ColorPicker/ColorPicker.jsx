import React, { useState, useRef, useEffect } from 'react';
import { RgbColorPicker } from 'react-colorful';
import styles from './ColorPicker.module.css';

export default function ColorPicker() {
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState({ r: 30, g: 70, b: 160 });
    const containerRef = useRef(null);

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
            {/* Color Circle Swatch Button */}
            <button
                type="button"
                className={styles.swatch}
                style={{ backgroundColor: rgbString }}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Choose color"
            />

            {/* Popover */}
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