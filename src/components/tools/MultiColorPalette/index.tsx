// src/components/tools/MultiColorPalette/index.tsx
import React, { useEffect } from 'react';
import { usePalette } from './usePalette';
import { PaletteStrip } from './PaletteStrip';
import { RefreshCw, Plus, Download } from 'lucide-react';

export default function MultiColorPalette() {
    const {
        colors,
        generatePalette,
        updateColor,
        toggleLock,
        removeColor,
        addColor,
    } = usePalette();

    // スペースキーで生成
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault(); // スクロール防止
                generatePalette();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [generatePalette]);

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] min-h-150 w-full bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            {/* --- Toolbar --- */}
            <div className="h-16 border-b border-stone-200 px-6 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-widest hidden md:inline">
                        Press Space to Generate
                    </span>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={addColor}
                        disabled={colors.length >= 10}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" />{' '}
                        <span className="hidden md:inline">Add Color</span>
                    </button>

                    <button
                        onClick={generatePalette}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" /> Generate
                    </button>
                </div>
            </div>

            {/* --- Palette Area --- */}
            <div className="flex-1 flex flex-col md:flex-row h-full">
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
        </div>
    );
}
