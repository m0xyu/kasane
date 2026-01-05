// src/components/tools/TextGradientGenerator/useTextGradient.ts
import { useState, useMemo, useCallback } from 'react';
import { generateGradientString, generateRandomColors } from './utils';

const INITIAL_COLORS = ['#FEDFE1', '#1E50A2'];
const DIRECTION_TYPES = ['linear', 'radial', 'conic'] as const;
export type DirectionType = (typeof DIRECTION_TYPES)[number];

export const useTextGradient = () => {
    const [colors, setColors] = useState<string[]>(INITIAL_COLORS);
    const [direction, setDirection] = useState(90);
    const [directionType, setDirectionType] = useState<DirectionType>('linear');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [previewText, setPreviewText] = useState('KASANE - 襲');

    // React Compilerを使用せずに手動で実装
    // directionType, direction, colorsが変わったらgradientStringを再計算
    // generateGradientStringが無駄に呼ばれないようにする
    const gradientString = useMemo(
        () => generateGradientString(directionType, direction, colors),
        [directionType, direction, colors]
    );

    const addColor = useCallback(() => {
        setColors((prev) => {
            if (prev.length >= 5) {
                return prev;
            }
            return [...prev, '#000000'];
        });
    }, []);

    const removeColor = useCallback((index: number) => {
        setColors((prev) => {
            if (prev.length <= 2) {
                return prev;
            }
            return prev.filter((_, i) => i !== index);
        });
    }, []);

    const updateColor = useCallback((index: number, newColor: string) => {
        setColors((prev) => {
            const next = [...prev];
            next[index] = newColor;
            return next;
        });
    }, []);

    const randomize = useCallback(() => {
        const newColors = generateRandomColors();
        setColors(newColors);
    }, []);

    return {
        state: {
            colors,
            direction,
            directionType,
            bgColor,
            previewText,
            gradientString,
        },
        actions: {
            setColors,
            setDirection,
            setDirectionType,
            setBgColor,
            setPreviewText,
            addColor,
            removeColor,
            updateColor,
            randomize,
        },
        consts: { DIRECTION_TYPES },
    };
};
