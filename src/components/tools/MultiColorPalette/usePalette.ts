// src/components/tools/MultiColorPalette/usePalette.ts
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { PaletteColor } from './types';

// ランダムカラー生成
const getRandomHex = () =>
    '#' +
    Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase();

const INITIAL_COUNT = 5;

export const usePalette = () => {
    const [colors, setColors] = useState<PaletteColor[]>(() =>
        Array.from({ length: INITIAL_COUNT }).map(() => ({
            id: uuidv4(),
            hex: getRandomHex(),
            isLocked: false,
        }))
    );

    // 全色ランダム生成（ロックされている色は除外）
    const generatePalette = useCallback(() => {
        setColors((prev) =>
            prev.map((color) => {
                if (color.isLocked) return color;
                return { ...color, hex: getRandomHex() };
            })
        );
    }, []);

    const updateColor = useCallback((id: string, newHex: string) => {
        setColors((prev) =>
            prev.map((c) => (c.id === id ? { ...c, hex: newHex } : c))
        );
    }, []);

    const toggleLock = useCallback((id: string) => {
        setColors((prev) =>
            prev.map((c) => (c.id === id ? { ...c, isLocked: !c.isLocked } : c))
        );
    }, []);

    const removeColor = useCallback((id: string) => {
        setColors((prev) => {
            if (prev.length <= 2) return prev;
            return prev.filter((c) => c.id !== id);
        });
    }, []);

    const addColor = useCallback(() => {
        setColors((prev) => {
            if (prev.length >= 10) return prev;
            return [
                ...prev,
                { id: uuidv4(), hex: getRandomHex(), isLocked: false },
            ];
        });
    }, []);

    const setPaletteColors = useCallback((newHexColors: string[]) => {
        const newPalette = newHexColors.map((hex) => ({
            id: uuidv4(),
            hex: hex.toUpperCase(),
            isLocked: false, // プリセット適用時はロックを解除するのが一般的
        }));
        setColors(newPalette);
    }, []);

    return {
        colors,
        generatePalette,
        updateColor,
        toggleLock,
        removeColor,
        addColor,
        setPaletteColors,
    };
};
