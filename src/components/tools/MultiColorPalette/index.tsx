// src/components/tools/MultiColorPalette/index.tsx
import { useEffect, useState } from 'react';
import { usePalette } from './usePalette';
import { PaletteStrip } from './PaletteStrip';
import { RefreshCw, Plus, BookOpen, X } from 'lucide-react';
import { KASANE_PRESETS } from '../../../data/kasane';

export default function MultiColorPalette() {
    const {
        colors,
        generatePalette,
        updateColor,
        toggleLock,
        removeColor,
        addColor,
        setPaletteColors,
    } = usePalette();

    const [showPresets, setShowPresets] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                generatePalette();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [generatePalette]);

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] min-h-150 w-full bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            {/* --- Toolbar --- */}
            <div className="h-16 border-b border-stone-200 px-4 md:px-6 flex items-center justify-between bg-white shrink-0 z-20">
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={() => setShowPresets(!showPresets)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all border
                            ${
                                showPresets
                                    ? 'bg-stone-100 text-stone-800 border-stone-300'
                                    : 'text-stone-600 hover:bg-stone-50 border-transparent hover:border-stone-200'
                            }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        <span className="hidden md:inline">Kasane Presets</span>
                    </button>
                    <span className="text-stone-300 hidden md:inline">|</span>
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-widest hidden md:inline">
                        Space to Generate
                    </span>
                </div>

                <div className="flex gap-2 md:gap-3">
                    <button
                        onClick={addColor}
                        disabled={colors.length >= 10}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" />{' '}
                        <span className="hidden md:inline">Add</span>
                    </button>

                    <button
                        onClick={generatePalette}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" />{' '}
                        <span className="hidden md:inline">Generate</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-y-auto md:overflow-y-hidden md:overflow-x-auto transition-all duration-500 ease-in-out">
                {colors.map((color) => (
                    <PaletteStrip
                        key={color.id}
                        color={color}
                        onUpdate={updateColor}
                        onToggleLock={toggleLock}
                        onRemove={removeColor}
                        canRemove={colors.length > 2}
                    />
                ))}
            </div>

            {/* --- Presets Panel --- */}
            <div
                className={`border-t border-stone-200 bg-stone-50 transition-all duration-300 ease-in-out overflow-hidden flex flex-col shrink-0
                    ${showPresets ? 'h-64 opacity-100' : 'h-0 opacity-0'}
                `}
            >
                {/* 閉じるボタンなどをここへ */}
                <div className="px-6 py-2 border-b border-stone-200 flex justify-between items-center shrink-0">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                        Traditional Colors
                    </span>
                    <button
                        onClick={() => setShowPresets(false)}
                        className="p-1 hover:bg-stone-200 rounded text-stone-400"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {KASANE_PRESETS.map((preset, index) => (
                            <button
                                key={index}
                                onClick={() => setPaletteColors(preset.colors)}
                                className="group flex flex-col gap-2 p-3 border border-stone-200 rounded-lg hover:border-pink-300 hover:shadow-md hover:bg-white transition-all text-left bg-white/50"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span className="font-bold text-slate-700 text-sm">
                                        {preset.name}
                                    </span>
                                    <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                                        {preset.season}
                                    </span>
                                </div>
                                <div className="h-6 w-full flex rounded overflow-hidden border border-stone-100/50">
                                    {preset.colors.map((c, i) => (
                                        <div
                                            key={i}
                                            style={{ backgroundColor: c }}
                                            className="flex-1 h-full"
                                        />
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
