// src/components/tools/ShopifyColorGenerator/index.tsx
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useHorizonLogic } from './useHorizonLogic';
import { Preview } from './Preview';
import { Copy, Check, Shuffle, RefreshCcw } from 'lucide-react';
import colorsData from '../../../data/colors.json';

export default function ShopifyColorGenerator() {
    const {
        brandColor,
        setBrandColor,
        bgColor,
        setBgColor,
        settings,
        jsonOutput,
    } = useHorizonLogic();

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        window.dispatchEvent(
            new CustomEvent('toast', {
                detail: { message: 'Scheme JSON copied!', type: 'success' },
            })
        );
    };

    const getRandomColor = () => {
        const random =
            colorsData[Math.floor(Math.random() * colorsData.length)];
        setBrandColor(random.hex);
    };

    return (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-8 min-w-0">
                <div className="bg-white p-6 border border-stone-200 rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                            1. Brand Color
                        </h3>
                        <button
                            onClick={getRandomColor}
                            className="text-stone-400 hover:text-pink-600 transition-colors"
                            title="Random Brand Color"
                        >
                            <Shuffle className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <div
                            className="w-12 h-12 rounded-lg border border-stone-200 shrink-0 shadow-inner"
                            style={{ backgroundColor: brandColor }}
                        />
                        <div className="flex-1 relative">
                            <HexColorPicker
                                color={brandColor}
                                onChange={setBrandColor}
                                style={{ width: '100%', height: '100px' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 border border-stone-200 rounded-xl shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                        2. Background
                    </h3>

                    <div className="grid grid-cols-4 gap-2 mb-2">
                        <button
                            onClick={() => setBgColor('#FFFFFF')}
                            className="py-2 rounded border border-stone-200 hover:border-pink-300 text-xs font-bold bg-white text-stone-600"
                        >
                            White
                        </button>
                        <button
                            onClick={() => setBgColor('#fcfaf2')}
                            className="py-2 rounded border border-stone-200 hover:border-pink-300 text-xs font-bold bg-[#fcfaf2] text-stone-600"
                        >
                            Washi
                        </button>
                        <button
                            onClick={() => setBgColor('#1A1A1A')}
                            className="py-2 rounded border border-stone-200 hover:border-pink-300 text-xs font-bold bg-[#1A1A1A] text-white"
                        >
                            Dark
                        </button>
                        <button
                            onClick={() => setBgColor(brandColor)}
                            className="py-2 rounded border border-stone-200 hover:border-pink-300 text-xs font-bold text-white shadow-inner"
                            style={{ backgroundColor: brandColor }}
                        >
                            Brand
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <div
                            className="w-12 h-12 rounded-lg border border-stone-200 shrink-0 shadow-inner"
                            style={{ backgroundColor: bgColor }}
                        />
                        <div className="flex-1 relative">
                            <HexColorPicker
                                color={bgColor}
                                onChange={setBgColor}
                                style={{ width: '100%', height: '100px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Output JSON */}
                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 max-w-full">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
                        <span className="text-xs font-bold text-slate-400">
                            settings_data.json
                        </span>
                        <button
                            onClick={handleCopy}
                            className="text-xs flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                        >
                            {copied ? (
                                <Check className="w-3 h-3 text-green-400" />
                            ) : (
                                <Copy className="w-3 h-3" />
                            )}
                            {copied ? 'Copied' : 'Copy JSON'}
                        </button>
                    </div>
                    <div className="relative group">
                        <pre className="p-4 overflow-x-auto text-[10px] text-blue-100 font-mono leading-relaxed h-48 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            {jsonOutput}
                        </pre>
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-slate-900 to-transparent pointer-events-none"></div>
                    </div>
                </div>
                <p className="text-xs text-stone-500 px-1">
                    *Paste this snippet into{' '}
                    <code className="font-bold">settings_data.json</code> inside
                    the <code className="font-bold">color_schemes</code> object.
                    <br />
                    Don't forget to add a comma{' '}
                    <code className="font-bold">,</code> between schemes if
                    needed.
                </p>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-8 min-w-0">
                <Preview s={settings} />
            </div>
        </div>
    );
}
