// src/components/tools/WagaraGenerator/useWagara.ts
import { useState, useMemo } from 'react';
import { PATTERNS, type WagaraPatternType } from './patterns';

export const useWagara = () => {
    const [selectedPatternId, setSelectedPatternId] =
        useState<WagaraPatternType>('seigaiha');
    const [mainColor, setMainColor] = useState('#00552E');
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [opacity, setOpacity] = useState(1);
    const [scale, setScale] = useState(80);

    // 現在選択されているパターンのオブジェクト
    const currentPattern = useMemo(
        () => PATTERNS.find((p) => p.id === selectedPatternId) || PATTERNS[0],
        [selectedPatternId]
    );

    // SVGデータURIの生成
    const svgUrl = useMemo(
        () => currentPattern.getSvg(mainColor, bgColor, opacity),
        [currentPattern, mainColor, bgColor, opacity]
    );

    // エクスポート用のCSSコード
    const cssCode = useMemo(() => {
        return `background-image: url("${svgUrl}");\nbackground-size: ${scale}px auto;\nbackground-repeat: repeat;`;
    }, [svgUrl, scale]);

    return {
        selectedPatternId,
        setSelectedPatternId,
        mainColor,
        setMainColor,
        bgColor,
        setBgColor,
        opacity,
        setOpacity,
        scale,
        setScale,
        currentPattern,
        svgUrl,
        cssCode,
    };
};
