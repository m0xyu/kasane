// src/components/tools/TailwindPalette/useTailwindPalette.ts
import { useState, useMemo, useEffect } from 'react';
import chroma from 'chroma-js';

// Tailwindのシェード定数
export const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export const useTailwindPalette = () => {
    const [baseColor, setBaseColor] = useState('#DC9FB4');
    const [colorName, setColorName] = useState('nadeshiko');

    const palette = useMemo(() => {
        if (!chroma.valid(baseColor)) return [];

        // 基準色を500番に固定し、白(50番)〜基準色〜黒(950番)のスケールを作る
        const scale = chroma
            .scale(['#fcfcfc', baseColor, '#0f0f0f'])
            .domain([0, 0.5, 1]) // 0=白, 0.5=基準色, 1=黒
            .mode('lch');

        return SHADES.map((shade) => {
            const position = shade / 1000;
            const hex = scale(position).hex();

            const textColor =
                chroma.contrast(hex, '#ffffff') > 4.5 ? '#ffffff' : '#1f2937';

            return {
                shade,
                hex: hex.toUpperCase(),
                textColor,
            };
        });
    }, [baseColor]);

    // Tailwind Config形式のコード生成
    const configCode = useMemo(() => {
        const colorsObj = palette.reduce((acc, curr) => {
            acc[curr.shade] = curr.hex;
            return acc;
        }, {} as Record<string, string>);

        const jsonContent = JSON.stringify(colorsObj, null, 4)
            .replace(/"([^"]+)":/g, '$1:')
            .replace(/"/g, "'");

        return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        '${colorName}': ${jsonContent}
      }
    }
  }
}`;
    }, [palette, colorName]);

    return {
        baseColor,
        setBaseColor,
        colorName,
        setColorName,
        palette,
        configCode,
    };
};
