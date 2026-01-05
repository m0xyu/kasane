// src/components/tools/TextGradientGenerator/utils.ts
import type { DirectionType } from './useTextGradient';

export const generateGradientString = (
    type: DirectionType,
    deg: number,
    colors: string[]
) => {
    let prefix = '';
    if (type === 'linear') prefix = `${deg}deg`;
    else if (type === 'conic') prefix = `from ${deg}deg`;
    else prefix = 'circle at center';

    return `${type}-gradient(${prefix}, ${colors.join(', ')})`;
};

export const generateRandomColors = () => {
    const count = Math.floor(Math.random() * (6 - 2) + 2); // 2~5
    return Array.from(
        { length: count },
        () =>
            '#' +
            Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, '0')
    );
};
