import React, { useState, useEffect } from 'react';
import {
    Plus,
    Trash2,
    RefreshCw,
    Copy,
    Check,
    Palette,
    Settings2,
    GripVertical,
    Wind,
} from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { ColorControlPanel } from './tools/TextGradientGenerator/panels/ColorControlPanel';
import { useTextGradient } from './tools/TextGradientGenerator/useTextGradient';
import { PreviewPanel } from './tools/TextGradientGenerator/panels/PreviewPanel';
import { SettingsPanel } from './tools/TextGradientGenerator/panels/SettingsPanel';
import type { DirectionType } from './tools/TextGradientGenerator/useTextGradient';

// デフォルトの初期カラー
const INITIAL_COLORS = ['#FEDFE1', '#1E50A2'];
const DIRECTION = [0, 90, 180, 270];
const DIRECTION_TYPE = ['linear', 'radial', 'conic'];

export default function TextGradientGenerator() {
    const { state, actions, consts } = useTextGradient();
    // --- State Management ---
    const [colors, setColors] = useState<string[]>(INITIAL_COLORS);
    const [direction, setDirection] = useState(DIRECTION[1]); // 角度 (deg)
    const [directionType, setDirectionType] = useState(DIRECTION_TYPE[0]); // 線型
    const [bgColor, setBgColor] = useState('#ffffff');
    const [previewText, setPreviewText] = useState('KASANE - 襲');
    const [activeColorIndex, setActiveColorIndex] = useState<number | null>(
        null
    ); // 現在ピッカーを開いている色のindex
    const [copied, setCopied] = useState(false);
    const [copiedTailwind, setCopiedTailwind] = useState(false);

    const getGradientPrefix = () => {
        if (directionType === 'linear') {
            return `${direction}deg`;
        }
        if (directionType === 'conic') {
            return `from ${direction}deg`;
        }
        // radial の場合は角度が無効なので、中央固定にする
        return 'circle at center';
    };

    // グラデーションCSSの文字列生成
    const gradientString = `${directionType}-gradient(${getGradientPrefix()}, ${colors.join(
        ', '
    )})`;

    // スタイルオブジェクト
    const textStyle: React.CSSProperties = {
        backgroundImage: gradientString,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
    };

    // 色の追加
    const addColor = () => {
        if (colors.length >= 5) return; // 最大5色まで
        setColors([...colors, '#000000']);
    };

    // 色の削除
    const removeColor = (index: number) => {
        if (colors.length <= 2) return; // 最低2色は必要
        const newColors = colors.filter((_, i) => i !== index);
        setColors(newColors);
    };

    // 色の変更
    const updateColor = (index: number, newColor: string) => {
        const newColors = [...colors];
        newColors[index] = newColor;
        setColors(newColors);
    };

    // ランダム生成
    const randomize = () => {
        const count = Math.floor(Math.random() * (6 - 2) + 2); //2 ~ 5
        const randomColor = () =>
            '#' +
            Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, '0');

        // countの回数分だけrandomColorを実行して配列を作る
        const newColors = Array.from({ length: count }, () => randomColor());
        setColors(newColors);
        // setDirection(Math.floor(Math.random() * 360));
    };

    // CSSコピー
    const copyCSS = async () => {
        const css = `background: ${gradientString};\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;\nbackground-clip: text;`;
        await navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyTailwindCSS = async () => {
        let val = gradientString.replace(/, /g, ',');
        val = val.replace(/ /g, '_');
        const tailwindClass = `bg-[${val}] bg-clip-text text-transparent`;

        await navigator.clipboard.writeText(tailwindClass);

        setCopiedTailwind(true);
        setTimeout(() => setCopiedTailwind(false), 2000);
    };

    // ピッカーを閉じるための処理 (外側クリック)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as Element).closest('.color-picker-wrapper')) {
                setActiveColorIndex(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row max-h-full min-h-125 p-4">
            {/* --- Left Panel: Colors Control --- */}
            <ColorControlPanel
                colors={state.colors}
                onAdd={actions.addColor}
                onRemove={actions.removeColor}
                onUpdate={actions.updateColor}
                onRandomize={actions.randomize}
            />
            {/* --- Center Panel: Preview --- */}
            <PreviewPanel
                text={state.previewText}
                setText={actions.setPreviewText}
                gradientString={state.gradientString}
                bgColor={state.bgColor}
                setBgColor={actions.setBgColor}
            />

            {/* --- Right Panel: Settings & Export --- */}
            <SettingsPanel
                direction={state.direction}
                setDirection={actions.setDirection}
                directionType={state.directionType}
                setDirectionType={actions.setDirectionType}
                directionTypes={consts.DIRECTION_TYPES}
            />
        </div>
    );
}
