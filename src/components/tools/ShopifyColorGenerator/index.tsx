// src/components/tools/ShopifyColorGenerator/index.tsx
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useHorizonLogic } from './useHorizonLogic';
import { Preview } from './Preview';
import {
    Copy,
    Check,
    Sun,
    Moon,
    Coffee,
    Shuffle,
    Box,
    LayoutTemplate,
} from 'lucide-react';
import colorsData from '../../../data/colors.json';

export default function ShopifyColorGenerator() {
    const {
        brandColor,
        setBrandColor,
        headerSettings,
        productSettings,
        headerJson,
        productJson,
    } = useHorizonLogic();
    const [copied, setCopied] = useState(false);

    const [activeTab, setActiveTab] = useState<'header' | 'product'>('header');

    const activeJson = activeTab === 'header' ? headerJson : productJson;
    const activeSettings =
        activeTab === 'header' ? headerSettings : productSettings;

    const handleCopy = () => {
        navigator.clipboard.writeText(activeJson);
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
            {/* Left: Controls */}
            <div className="lg:col-span-4 space-y-8 min-w-0">
                <div className="bg-white p-6 border border-stone-200 rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                            Brand Color
                        </h3>
                        <button
                            onClick={getRandomColor}
                            className="text-stone-400 hover:text-pink-600 transition-colors"
                            title="Random Color"
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
                                style={{ width: '100%', height: '120px' }}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-xs font-bold text-stone-500">
                            HEX
                        </span>
                        <input
                            type="text"
                            value={brandColor.toUpperCase()}
                            onChange={(e) => setBrandColor(e.target.value)}
                            className="flex-1 bg-stone-50 border border-stone-200 rounded px-2 py-1 text-sm font-mono outline-none focus:border-pink-300"
                        />
                    </div>
                </div>

                {/* Output JSON Section with Tabs */}
                <div className="space-y-0">
                    <div className="flex gap-1 pl-1">
                        <button
                            onClick={() => setActiveTab('header')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-xs font-bold transition-colors ${
                                activeTab === 'header'
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                            }`}
                        >
                            <LayoutTemplate className="w-3 h-3" />
                            Header Scheme
                        </button>
                        <button
                            onClick={() => setActiveTab('product')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-xs font-bold transition-colors ${
                                activeTab === 'product'
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                            }`}
                        >
                            <Box className="w-3 h-3" />
                            Product Scheme
                        </button>
                    </div>

                    <div className="bg-slate-900 rounded-b-xl rounded-tr-xl overflow-hidden shadow-lg border border-slate-800 max-w-full">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
                            <span className="text-xs font-bold text-slate-400">
                                {activeTab === 'header'
                                    ? 'scheme-kasane-header'
                                    : 'scheme-kasane-product'}
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
                            <pre className="p-4 overflow-x-auto text-[10px] text-blue-100 font-mono leading-relaxed h-64 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                                {activeJson}
                            </pre>
                            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                    <p className="text-xs text-stone-500 px-1 mt-2">
                        *Paste this snippet into your{' '}
                        <code>settings_data.json</code>. <br />
                        Use <strong>Header Scheme</strong> for specific sections
                        (Header, Footer). <br />
                        Use <strong>Product Scheme</strong> for clean, readable
                        content areas.
                    </p>
                </div>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-8">
                <Preview s={activeSettings} />
            </div>
        </div>
    );
}
