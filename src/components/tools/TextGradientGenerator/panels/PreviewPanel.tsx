// src/components/tools/TextGradientGenerator/panels/PreviewPanel.tsx
interface Props {
    text: string;
    setText: (text: string) => void;
    gradientString: string;
    bgColor: string;
    setBgColor: (color: string) => void;
}

export const PreviewPanel = ({
    text,
    setText,
    gradientString,
    bgColor,
    setBgColor,
}: Props) => {
    const textStyle: React.CSSProperties = {
        backgroundImage: gradientString,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
    };

    return (
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
                    value={text}
                    onChange={(e) => setText(e.target.value)}
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
    );
};
