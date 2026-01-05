// src/components/tools/WagaraGenerator/Controls.tsx
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { PATTERNS, type WagaraPatternType } from './patterns';

interface Props {
    selectedPatternId: WagaraPatternType;
    onSelectPattern: (id: WagaraPatternType) => void;
    mainColor: string;
    onMainColorChange: (color: string) => void;
    bgColor: string;
    onBgColorChange: (color: string) => void;
    opacity: number;
    onOpacityChange: (val: number) => void;
    scale: number;
    onScaleChange: (val: number) => void;
}

export const Controls = ({
    selectedPatternId,
    onSelectPattern,
    mainColor,
    onMainColorChange,
    bgColor,
    onBgColorChange,
    opacity,
    onOpacityChange,
    scale,
    onScaleChange,
}: Props) => {
    return (
        <div className="space-y-8 p-6 bg-white border border-stone-200 rounded-xl shadow-sm h-full overflow-y-auto">
            {/* Pattern Selection */}
            <div>
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">
                    Pattern
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {PATTERNS.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => onSelectPattern(p.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                                ${
                                    selectedPatternId === p.id
                                        ? 'border-slate-800 bg-slate-50'
                                        : 'border-stone-100 hover:border-stone-300'
                                }`}
                        >
                            <span className="text-sm font-bold text-slate-700">
                                {p.name}
                            </span>
                            <span className="text-[10px] text-stone-400">
                                {p.yomi}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Colors */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">
                    Colors
                </h3>

                {/* Main Color */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-600 block">
                        Pattern Color
                    </label>
                    <div className="flex gap-4">
                        <div
                            className="w-12 h-12 rounded-lg border border-stone-200 shrink-0"
                            style={{ backgroundColor: mainColor }}
                        />
                        <div className="flex-1 relative">
                            <HexColorPicker
                                color={mainColor}
                                onChange={onMainColorChange}
                                style={{ width: '100%', height: '120px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Background Color */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-600 block">
                        Background Color
                    </label>
                    <div className="flex gap-4">
                        <div
                            className="w-12 h-12 rounded-lg border border-stone-200 shrink-0"
                            style={{ backgroundColor: bgColor }}
                        />
                        <div className="flex-1 relative">
                            <HexColorPicker
                                color={bgColor}
                                onChange={onBgColorChange}
                                style={{ width: '100%', height: '120px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Adjustments */}
            <div>
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">
                    Adjustments
                </h3>

                <div className="space-y-6">
                    {/* Scale Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="font-bold text-stone-600">
                                Scale
                            </span>
                            <span className="text-stone-400">{scale}px</span>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="200"
                            value={scale}
                            onChange={(e) =>
                                onScaleChange(Number(e.target.value))
                            }
                            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                        />
                    </div>

                    {/* Opacity Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="font-bold text-stone-600">
                                Opacity
                            </span>
                            <span className="text-stone-400">
                                {Math.round(opacity * 100)}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.05"
                            value={opacity}
                            onChange={(e) =>
                                onOpacityChange(Number(e.target.value))
                            }
                            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
