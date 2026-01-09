// src/components/tools/TextGradientGenerator/panels/ColorControlPanel.tsx
import { GripVertical, Palette, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface Props {
    colors: string[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, color: string) => void;
    onRandomize: () => void;
    setColors: (colors: string[]) => void;
}

export const ColorControlPanel = ({
    colors,
    onAdd,
    onRemove,
    onUpdate,
    onRandomize,
    setColors,
}: Props) => {
    const [activeColorIndex, setActiveColorIndex] = useState<number | null>(
        null
    );

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
        <div className="w-full lg:w-80 bg-white border-r border-stone-200 p-6 flex flex-col gap-6 min-h-48 overflow-y-auto">
            {/* ヘッダー部分 */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Colors
                </h3>
                <button
                    onClick={onRandomize}
                    className="text-xs text-stone-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                >
                    <RefreshCw className="w-3 h-3" /> Random
                </button>
            </div>

            {/* カラーリスト部分 */}
            <div className="space-y-3">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="flex bg-transparent items-center gap-2 group relative color-picker-wrapper"
                        draggable="true"
                        onDragStart={(e) => {
                            e.dataTransfer?.setData('index', index.toString());
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            // ドラッグ元とドラッグ先のインデックスを取得
                            const fromIndex = Number(
                                e.dataTransfer?.getData('index')
                            );
                            const toIndex = index;
                            if (fromIndex === toIndex) return;
                            const newColors = [...colors];
                            // ドラッグ元の色を取り出す
                            const [movedColor] = newColors.splice(fromIndex, 1);
                            // ドラッグ先に挿入
                            newColors.splice(toIndex, 0, movedColor);
                            setColors(newColors);
                        }}
                    >
                        <GripVertical className="w-4 h-4 text-stone-400 cursor-move" />

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
                                        onChange={(c) => onUpdate(index, c)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Hex Input */}
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => onUpdate(index, e.target.value)}
                            className="text-sm flex-1 min-w-0 font-mono border border-stone-200 rounded px-2 py-1.5 focus:outline-none focus:border-slate-400 uppercase"
                        />

                        {/* Remove Button */}
                        <button
                            onClick={() => onRemove(index)}
                            disabled={colors.length <= 2}
                            className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-400"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={onAdd}
                disabled={colors.length >= 5}
                className="w-full mt-4 py-2 border border-dashed border-stone-300 rounded-lg text-stone-500 hover:text-slate-800 hover:border-slate-400 hover:bg-stone-50 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-40"
            >
                <Plus className="w-4 h-4" /> Add Color
            </button>
        </div>
    );
};
