// src/components/tools/TailwindPalette/useTailwindPalette.ts
import { useState, useMemo, useEffect } from 'react';
import chroma from 'chroma-js';

// Tailwindのシェード定数
export const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch';
export type OutputSyntax = 'tailwind_v4' | 'tailwind_v3' | 'css_variables';

export const useTailwindPalette = () => {
    const [baseColor, setBaseColor] = useState('#DC9FB4');
    const [colorName, setColorName] = useState('nadeshiko');
    const [format, setFormat] = useState<ColorFormat>('hex');
    const [syntax, setSyntax] = useState<OutputSyntax>('tailwind_v4');

    const palette = useMemo(() => {
        if (!chroma.valid(baseColor)) return [];

        const scale = chroma
            .scale(['#fcfcfc', baseColor, '#0f0f0f'])
            .domain([0, 0.5, 1])
            .mode('lch');

        return SHADES.map((shade) => {
            const position = shade / 1000;
            const color = scale(position);
            const [l, c, h] = color.oklch();

            const safeL = isNaN(l) ? 0 : l;
            const safeC = isNaN(c) ? 0 : c;
            const safeH = isNaN(h) ? 0 : h;

            const textColor =
                chroma.contrast(color.hex(), '#ffffff') > 4.5
                    ? '#ffffff'
                    : '#1f2937';

            return {
                shade,
                textColor,
                hex: color.hex().toUpperCase(),
                rgb: color.css('rgb'),
                hsl: color.css('hsl'),
                oklch: `oklch(${safeL.toFixed(3)} ${safeC.toFixed(
                    3
                )} ${safeH.toFixed(3)})`,
            };
        });
    }, [baseColor]);

    const configCode = useMemo(() => {
        if (palette.length === 0) return '';

        if (syntax === 'tailwind_v4') {
            const lines = palette
                .map((p) => `  --color-${colorName}-${p.shade}: ${p[format]};`)
                .join('\n');
            return `@theme {\n${lines}\n}`;
        }

        if (syntax === 'css_variables') {
            const lines = palette
                .map((p) => `  --color-${colorName}-${p.shade}: ${p[format]};`)
                .join('\n');
            return `:root {\n${lines}\n}`;
        }

        if (syntax === 'tailwind_v3') {
            const colorsObj = palette.reduce((acc, curr) => {
                acc[curr.shade] = curr[format];
                return acc;
            }, {} as Record<string, string>);

            const jsonContent = JSON.stringify(colorsObj, null, 4)
                .replace(/"([^"]+)":/g, '$1:')
                .replace(/"/g, "'");

            return `module.exports = {
  theme: {
    extend: {
      colors: {
        '${colorName}': ${jsonContent}
      }
    }
  }
}`;
        }

        return '';
    }, [palette, colorName, format, syntax]);

    return {
        baseColor,
        setBaseColor,
        colorName,
        setColorName,
        format,
        setFormat,
        syntax,
        setSyntax,
        palette,
        configCode,
    };
};
