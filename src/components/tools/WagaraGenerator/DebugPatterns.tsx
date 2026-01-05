// src/components/tools/WagaraGenerator/DebugPatterns.tsx
import { PATTERNS } from './patterns';

export default function DebugPatterns() {
    // テスト用の色設定
    const color = '#FF5252'; // 赤（柄）
    const bgColor = '#FFFFFF'; // 白（背景）
    const opacity = 1.0;

    return (
        <div className="p-10 bg-stone-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Wagara Pattern Debugger</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PATTERNS.map((pattern) => {
                    // SVG文字列（Data URI）を取得
                    const svgUrl = `url("${pattern.getSvg(
                        color,
                        bgColor,
                        opacity
                    )}")`;

                    return (
                        <div
                            key={pattern.id}
                            className="bg-white p-4 rounded-xl shadow-sm"
                        >
                            <h3 className="font-bold text-lg mb-2">
                                {pattern.name}
                            </h3>
                            <p className="text-xs text-stone-400 mb-4">
                                {pattern.id}
                            </p>

                            {/* 実際に背景として適用してみるエリア */}
                            <div
                                className="w-full h-48 border-2 border-stone-300 rounded-lg"
                                style={{
                                    backgroundImage: svgUrl,
                                    // backgroundSize: '100px', // 必要に応じてサイズ調整
                                }}
                            ></div>

                            {/* SVGのソースコードを確認したい場合（オプション） */}
                            <details className="mt-4">
                                <summary className="text-xs text-blue-500 cursor-pointer">
                                    Show Code
                                </summary>
                                <pre className="text-[10px] bg-slate-800 text-white p-2 rounded mt-2 overflow-x-auto">
                                    {pattern.getSvg(color, bgColor, opacity)}
                                </pre>
                            </details>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
