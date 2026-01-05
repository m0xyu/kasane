// src/components/tools/MultiColorPalette/PaletteStrip.tsx
import { memo } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Lock, Unlock, X, Check } from 'lucide-react';
import type { PaletteColor } from './types';
import { useState } from 'react';

// 明るさ判定関数 (YIQ)
const getContrastColor = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1c1917' : '#ffffff'; // 明るければ黒、暗ければ白
};

interface Props {
    color: PaletteColor;
    onUpdate: (id: string, hex: string) => void;
    onToggleLock: (id: string) => void;
    onRemove: (id: string) => void;
    canRemove: boolean;
}

export const PaletteStrip = memo(
    ({ color, onUpdate, onToggleLock, onRemove, canRemove }: Props) => {
        const [isPickerOpen, setIsPickerOpen] = useState(false);
        const [copied, setCopied] = useState(false);
        const textColor = getContrastColor(color.hex);

        const handleCopy = async () => {
            await navigator.clipboard.writeText(color.hex);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);

            window.dispatchEvent(
                new CustomEvent('toast', {
                    detail: {
                        message: `Copied ${color.hex} to clipboard!`,
                        type: 'success',
                    },
                })
            );
        };

        return (
            <div
                className="relative flex-1 min-h-30 md:min-h-100 flex flex-col items-center justify-center group transition-all duration-300"
                style={{ backgroundColor: color.hex, color: textColor }}
            >
                <div className="absolute md:top-4 max-md:top-1 inset-x-0 flex flex-col items-center gap-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 z-10">
                    {canRemove && (
                        <button
                            onClick={() => onRemove(color.id)}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors"
                            title="Remove color"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="flex flex-col items-center gap-2 relative z-0">
                    <button
                        onClick={handleCopy}
                        className="text-2xl md:text-3xl font-bold font-mono tracking-wider hover:scale-105 transition-transform uppercase flex items-center gap-2"
                    >
                        {color.hex}
                        {copied && <Check className="w-5 h-5" />}
                    </button>

                    {/* {color.name && (
                        <span className="text-sm opacity-80">{color.name}</span>
                    )} */}
                </div>

                <div className="absolute md:bottom-8 md:right-0 md:left-0 max-md:right-2 flex flex-col items-center gap-4">
                    <button
                        onClick={() => onToggleLock(color.id)}
                        className={`p-3 rounded-full transition-all duration-200 ${
                            color.isLocked
                                ? 'bg-white/20 shadow-inner'
                                : 'opacity-50 hover:opacity-100 hover:bg-white/10'
                        }`}
                        title={color.isLocked ? 'Unlock' : 'Lock'}
                    >
                        {color.isLocked ? (
                            <Lock className="w-6 h-6" />
                        ) : (
                            <Unlock className="w-6 h-6" />
                        )}
                    </button>

                    <button
                        onClick={() => setIsPickerOpen(!isPickerOpen)}
                        className="text-xs opacity-50 hover:opacity-100 underline"
                    >
                        Edit
                    </button>

                    {isPickerOpen && (
                        <div className="absolute bottom-12 z-50 animate-fade-in">
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsPickerOpen(false)}
                            />
                            <div className="relative z-50 shadow-xl rounded-lg overflow-hidden">
                                <HexColorPicker
                                    color={color.hex}
                                    onChange={(hex) => onUpdate(color.id, hex)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);
