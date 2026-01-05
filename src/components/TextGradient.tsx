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

// デフォルトの初期カラー
const INITIAL_COLORS = ['#FEDFE1', '#1E50A2'];
const DIRECTION = [0, 90, 180, 270];
const DIRECTION_TYPE = ['linear', 'radial', 'conic'];

export default function TextGradientGenerator() {
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
            <div className="w-full lg:w-80 bg-white border-r border-stone-200 p-6 flex flex-col gap-6">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Palette className="w-4 h-4" /> Colors
                        </h3>
                        <button
                            onClick={randomize}
                            className="text-xs text-stone-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                        >
                            <RefreshCw className="w-3 h-3" /> Random
                        </button>
                    </div>

                    <div className="space-y-3">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 group relative color-picker-wrapper"
                            >
                                <GripVertical className="w-4 h-4 text-stone-300 cursor-move" />

                                {/* Color Preview / Trigger */}
                                <div className="relative">
                                    <button
                                        className="w-8 h-8 rounded-full border border-stone-200 shadow-sm cursor-pointer"
                                        style={{ backgroundColor: color }}
                                        onClick={() =>
                                            setActiveColorIndex(
                                                activeColorIndex === index
                                                    ? null
                                                    : index
                                            )
                                        }
                                    />

                                    {/* Popover Color Picker */}
                                    {activeColorIndex === index && (
                                        <div className="absolute top-10 left-0 z-50 animate-fade-in shadow-xl">
                                            <HexColorPicker
                                                color={color}
                                                onChange={(c) =>
                                                    updateColor(index, c)
                                                }
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Hex Input */}
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) =>
                                        updateColor(index, e.target.value)
                                    }
                                    className="flex-1 text-sm font-mono border border-stone-200 rounded px-2 py-1.5 focus:outline-none focus:border-slate-400 uppercase"
                                />

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeColor(index)}
                                    disabled={colors.length <= 2}
                                    className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-400"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addColor}
                        disabled={colors.length >= 5}
                        className="w-full mt-4 py-2 border border-dashed border-stone-300 rounded-lg text-stone-500 hover:text-slate-800 hover:border-slate-400 hover:bg-stone-50 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" /> Add Color
                    </button>
                </div>
            </div>

            {/* --- Center Panel: Preview --- */}
            <div
                className="flex-1 flex flex-col items-center justify-center p-10 relative transition-colors duration-300 min-h-100"
                style={{ backgroundColor: bgColor }}
            >
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-stone-200 rounded-lg p-2 shadow-sm flex items-center gap-3 text-xs">
                    <span className="text-stone-500">Preview BG:</span>
                    <div className="flex gap-1">
                        {['#ffffff', '#fcfaf2', '#1c1917'].map((c) => (
                            <button
                                key={c}
                                onClick={() => setBgColor(c)}
                                className={`w-6 h-6 rounded-full border ${
                                    bgColor === c
                                        ? 'border-slate-800 scale-110'
                                        : 'border-stone-200'
                                }`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-2xl text-center space-y-8">
                    <input
                        type="text"
                        value={previewText}
                        onChange={(e) => setPreviewText(e.target.value)}
                        className="w-full text-center bg-transparent border-none focus:outline-none text-5xl md:text-8xl font-black tracking-tighter"
                        style={textStyle}
                        placeholder="Type here..."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-90">
                        <div>
                            <p
                                className="text-2xl font-bold mb-2"
                                style={textStyle}
                            >
                                日本語も美しい
                            </p>
                            <p className="text-sm text-stone-400 font-serif">
                                NIPPON IRO Style
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-2xl font-serif mb-2"
                                style={textStyle}
                            >
                                侘び寂び
                            </p>
                            <p className="text-sm text-stone-400 font-serif">
                                Serif Font Style
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Right Panel: Settings & Export --- */}
            <div className="w-full lg:w-72 bg-white border-l border-stone-200 p-6 flex flex-col gap-8">
                {/* Gradient Direction */}
                <div>
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                        <Settings2 className="w-4 h-4" /> Settings
                    </h3>

                    <div className="mb-6">
                        <p className="text-xs font-bold text-stone-400 uppercase block mb-2">
                            Direction Type ({directionType})
                        </p>
                        <fieldset className="flex gap-4">
                            {DIRECTION_TYPE.map((type) => (
                                <div
                                    key={type}
                                    className="flex items-center gap-1"
                                >
                                    <input
                                        id={type}
                                        type="radio"
                                        name="direction-type"
                                        value={type}
                                        checked={type === directionType}
                                        onChange={() => setDirectionType(type)}
                                        className="accent-slate-800"
                                    />
                                    <label
                                        htmlFor={type}
                                        className={`text-xs font-bold ${
                                            type === directionType
                                                ? 'text-slate-800'
                                                : 'text-stone-400'
                                        }`}
                                    >
                                        {type}
                                    </label>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                    {directionType !== 'radial' && (
                        <div className="mb-6">
                            <label className="text-xs font-bold text-stone-400 uppercase block mb-2">
                                Direction ({direction}°)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={direction}
                                onChange={(e) =>
                                    setDirection(Number(e.target.value))
                                }
                                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                            />
                            <div className="flex justify-between mt-2">
                                {DIRECTION.map((deg) => (
                                    <button
                                        key={deg}
                                        onClick={() => setDirection(deg)}
                                        className={`text-xs px-2 py-1 rounded ${
                                            direction === deg
                                                ? 'bg-slate-100 text-slate-800 font-bold'
                                                : 'text-stone-400 hover:text-stone-600'
                                        }`}
                                    >
                                        {deg}°
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* CSS Export Code */}
                <div className="mt-auto space-y-4">
                    {/* --- Standard CSS Export --- */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-stone-400 uppercase">
                                CSS Code
                            </label>
                            <button
                                onClick={copyCSS}
                                className="text-xs flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                            >
                                {copied ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                    <Copy className="w-3 h-3" />
                                )}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <div className="relative group">
                            <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                                <code>
                                    {`background: ${gradientString}; 
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;`}
                                </code>
                            </pre>
                        </div>
                    </div>

                    {/* --- Tailwind CSS Export (New!) --- */}
                    <button
                        onClick={copyTailwindCSS}
                        className={`
                    w-full py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 border
                    ${
                        copiedTailwind
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-white text-slate-600 border-stone-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-sm'
                    }
                `}
                    >
                        {copiedTailwind ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Wind className="w-4 h-4" />
                        )}
                        {copiedTailwind
                            ? 'Copied Tailwind Class!'
                            : 'Copy Tailwind Class'}
                    </button>
                </div>
            </div>
        </div>
    );
}
