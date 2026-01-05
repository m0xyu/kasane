// src/components/tools/TailwindPalette/UiPreview.tsx
interface Props {
    palette: { shade: number; hex: string; textColor: string }[];
    colorName: string;
}

export const UiPreview = ({ palette, colorName }: Props) => {
    const getColor = (shade: number) =>
        palette.find((p) => p.shade === shade)?.hex || '#ccc';
    const getText = (shade: number) =>
        palette.find((p) => p.shade === shade)?.textColor || '#000';

    return (
        <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="px-4 py-3 border-b border-stone-100 bg-stone-50 text-xs font-bold text-stone-500 uppercase tracking-widest">
                Component Preview
            </div>
            <div className="p-8 grid gap-8">
                <div className="grid md:grid-cols-2 gap-4">
                    <div
                        className="p-6 rounded-xl shadow-md"
                        style={{
                            backgroundColor: getColor(500),
                            color: getText(500),
                        }}
                    >
                        <h3 className="font-bold text-lg mb-2">Primary Card</h3>
                        <p className="opacity-90 text-sm">
                            Use the 500 shade for primary backgrounds. It
                            balances visibility and vibrancy.
                        </p>
                    </div>

                    <div
                        className="p-6 rounded-xl border-2"
                        style={{
                            backgroundColor: getColor(50),
                            borderColor: getColor(200),
                            color: getColor(900),
                        }}
                    >
                        <h3 className="font-bold text-lg mb-2">Subtle Card</h3>
                        <p className="opacity-80 text-sm">
                            Use 50 for backgrounds, 200 for borders, and 900 for
                            text to create hierarchy.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    <button
                        className="px-6 py-2.5 rounded-lg font-bold shadow-sm transition-transform active:scale-95"
                        style={{
                            backgroundColor: getColor(600),
                            color: getText(600),
                        }}
                    >
                        Primary Button (600)
                    </button>

                    <button
                        className="px-6 py-2.5 rounded-lg font-bold transition-colors"
                        style={{
                            backgroundColor: getColor(100),
                            color: getColor(800),
                        }}
                    >
                        Secondary (100)
                    </button>

                    <button
                        className="px-6 py-2.5 rounded-lg font-bold border"
                        style={{
                            borderColor: getColor(300),
                            color: getColor(700),
                        }}
                    >
                        Outline (300/700)
                    </button>
                </div>

                {/* Alert/Badge Section */}
                <div
                    className="flex items-center gap-4 p-4 rounded-lg border"
                    style={{
                        backgroundColor: getColor(50),
                        borderColor: getColor(200),
                        color: getColor(800),
                    }}
                >
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: getColor(200) }}
                    >
                        <span style={{ color: getColor(700) }}>★</span>
                    </div>
                    <div>
                        <strong className="block text-sm">Notification</strong>
                        <span className="text-xs opacity-80">
                            This alert uses shades 50, 200, and 800.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
