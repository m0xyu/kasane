// src/components/tools/TailwindPalette/index.tsx
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import {
    useTailwindPalette,
    type ColorFormat,
    type OutputSyntax,
} from './useTailwindPalette';
import { UiPreview } from './UiPreview';
import { Copy, Check, Palette } from 'lucide-react';
import colorsData from '../../../data/colors.json';

export default function TailwindPaletteGenerator() {
    const {
        baseColor,
        setBaseColor,
        colorName,
        setColorName,
        palette,
        configCode,
        format,
        setFormat,
        syntax,
        setSyntax,
    } = useTailwindPalette();
    const [copied, setCopied] = useState(false);

    const [randomPresets, setRandomPresets] = useState<typeof colorsData>([]);

    const handleCopy = () => {
        navigator.clipboard.writeText(configCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        window.dispatchEvent(
            new CustomEvent('toast', {
                detail: {
                    message: `${syntax} copied to clipboard!`,
                    type: 'success',
                },
            })
        );
    };

    const applyPreset = (hex: string, id: string) => {
        setBaseColor(hex);
        setColorName(id);
    };

    const shufflePresets = () => {
        const shuffled = [...colorsData].sort(() => 0.5 - Math.random());
        setRandomPresets(shuffled.slice(0, 10));
    };

    useEffect(() => {
        shufflePresets();
    }, []);

    return (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 border border-stone-200 rounded-xl shadow-sm">
                    <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">
                        Base Color
                    </h3>

                    <div className="mb-6">
                        <HexColorPicker
                            color={baseColor}
                            onChange={setBaseColor}
                            style={{ width: '100%', height: '160px' }}
                        />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-600 mb-1">
                                Hex Code
                            </label>
                            <div className="flex gap-2">
                                <div
                                    className="w-10 h-10 rounded-lg border border-stone-200 shrink-0 shadow-inner"
                                    style={{ backgroundColor: baseColor }}
                                />
                                <input
                                    type="text"
                                    value={baseColor.toUpperCase()}
                                    onChange={(e) =>
                                        setBaseColor(e.target.value)
                                    }
                                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 font-mono text-sm focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-600 mb-1">
                                Variable Name
                            </label>
                            <input
                                type="text"
                                value={colorName}
                                onChange={(e) =>
                                    setColorName(
                                        e.target.value.replace(
                                            /[^a-zA-Z0-9-_]/g,
                                            ''
                                        )
                                    )
                                }
                                placeholder="e.g. primary"
                                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 font-mono text-sm focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none"
                            />
                            <p className="text-[10px] text-stone-400 mt-1">
                                Used in code: bg-{colorName}-500
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Output Settings --- */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                        Output Format
                    </h3>

                    {/* 1. Syntax Selection (v4 / v3 / CSS) */}
                    <div className="flex bg-stone-100 p-1 rounded-lg">
                        {(
                            [
                                'tailwind_v4',
                                'tailwind_v3',
                                'css_variables',
                            ] as OutputSyntax[]
                        ).map((s) => (
                            <button
                                key={s}
                                onClick={() => setSyntax(s)}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                                    syntax === s
                                        ? 'bg-white text-stone-800 shadow-sm'
                                        : 'text-stone-500 hover:text-stone-700'
                                }`}
                            >
                                {s === 'tailwind_v4' && 'v4'}
                                {s === 'tailwind_v3' && 'v3'}
                                {s === 'css_variables' && 'CSS'}
                            </button>
                        ))}
                    </div>

                    {/* 2. Color Unit Selection (Hex / RGB / OKLCH...) */}
                    <div className="grid grid-cols-4 gap-2">
                        {(['hex', 'rgb', 'hsl', 'oklch'] as ColorFormat[]).map(
                            (f) => (
                                <button
                                    key={f}
                                    onClick={() => setFormat(f)}
                                    className={`py-1.5 px-2 text-[10px] font-bold uppercase rounded border transition-colors ${
                                        format === f
                                            ? 'border-rose-400 bg-rose-50 text-rose-600'
                                            : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                                    }`}
                                >
                                    {f}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Code Output Area */}
                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
                        <span className="text-xs font-bold text-slate-400">
                            {syntax === 'tailwind_v4'
                                ? 'theme.css'
                                : syntax === 'tailwind_v3'
                                ? 'tailwind.config.js'
                                : 'variables.css'}
                        </span>
                        <button
                            onClick={handleCopy}
                            className="text-xs flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                        >
                            {copied ? (
                                <Check className="w-3 h-3 text-green-400" />
                            ) : (
                                <Copy className="w-3 h-3" />
                            )}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    {/* Code Body */}
                    <div className="relative group">
                        <pre className="p-4 overflow-x-auto text-[10px] text-blue-100 font-mono leading-relaxed h-64 scrollbar-thin scrollbar-thumb-slate-700">
                            {configCode}
                        </pre>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
                <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-stone-100 bg-stone-50 text-xs font-bold text-stone-500 uppercase tracking-widest flex justify-between">
                        <span>Generated Scale</span>
                        <span className="text-[10px] text-stone-400">
                            50 - 950
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row h-auto md:h-32 divide-y md:divide-y-0 md:divide-x divide-stone-100">
                        {palette.map((item) => (
                            <div
                                key={item.shade}
                                className="group flex-1 flex md:flex-col items-center justify-between md:justify-center p-3 md:p-2 transition-all hover:flex-[1.5] relative"
                                style={{ backgroundColor: item.hex }}
                            >
                                <span
                                    className="text-xs font-bold mb-0 md:mb-2 w-8 md:w-auto text-center"
                                    style={{ color: item.textColor }}
                                >
                                    {item.shade}
                                </span>
                                <span
                                    className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity absolute md:static right-4 bg-black/20 md:bg-transparent px-1 rounded md:px-0"
                                    style={{ color: item.textColor }}
                                >
                                    {item.hex}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Quick Select: Traditional Colors
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {randomPresets.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => applyPreset(color.hex, color.id)}
                                className="group flex items-center gap-3 p-2 rounded-lg border border-stone-100 hover:border-pink-200 hover:bg-stone-50 transition-all text-left"
                            >
                                <div
                                    className="w-8 h-8 rounded-full shadow-inner shrink-0"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <div className="min-w-0">
                                    <div className="text-xs font-bold text-stone-700 group-hover:text-pink-600 transition-colors">
                                        {color.nameJp}
                                    </div>
                                    <div className="text-[10px] text-stone-400 truncate">
                                        {color.reading}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <UiPreview palette={palette} colorName={colorName} />
            </div>
        </div>
    );
}
