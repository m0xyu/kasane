// src/components/tools/WagaraGenerator/PatternPreview.tsx
import React, { useState } from 'react';
import { Copy, Check, FileCode, FileImage } from 'lucide-react';
import { downloadAsSvg, downloadAsPng } from './utils';

interface Props {
    svgUrl: string;
    cssCode: string;
    scale: number;
    patternName: string;
}

export const PatternPreview = ({
    svgUrl,
    cssCode,
    scale,
    patternName,
}: Props) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        window.dispatchEvent(
            new CustomEvent('toast', {
                detail: {
                    message: 'CSS code copied to clipboard!',
                    type: 'success',
                },
            })
        );
    };

    const getRawSvgData = () => {
        const match = svgUrl.match(/url\("?(.*?)"?\)/);
        return match ? match[1] : svgUrl;
    };

    const buttonClass =
        'flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur shadow-sm border border-stone-200 rounded-lg text-sm font-bold text-slate-800 hover:bg-white hover:text-green-700 transition-all cursor-pointer active:scale-95';

    return (
        <div className="relative h-full min-h-100 flex flex-col bg-stone-100/50 rounded-xl overflow-hidden border border-stone-200">
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 z-10 flex gap-2 flex-wrap justify-end">
                {/* Copy CSS Button */}
                <button
                    onClick={handleCopy}
                    className={buttonClass}
                    title="CSSをコピー"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                    <span>{copied ? 'Copied!' : 'Copy CSS'}</span>
                </button>

                {/* Download SVG Button */}
                <button
                    onClick={() =>
                        downloadAsSvg(
                            getRawSvgData(),
                            `kasane-wagara-${patternName}`
                        )
                    }
                    className={buttonClass}
                    title="SVGとしてダウンロード"
                >
                    <FileCode className="w-4 h-4" />
                    <span>SVG</span>
                </button>

                {/* Download PNG Button */}
                <button
                    onClick={() =>
                        downloadAsPng(
                            getRawSvgData(),
                            `kasane-wagara-${patternName}`
                        )
                    }
                    className={buttonClass}
                    title="PNGとしてダウンロード"
                >
                    <FileImage className="w-4 h-4" />
                    <span>PNG</span>
                </button>
            </div>

            <div
                className="flex-1 w-full transition-all duration-300"
                style={{
                    backgroundImage: `url("${svgUrl}")`,
                    backgroundSize: `${scale}px auto`,
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                }}
            />

            <div className="absolute bottom-0 inset-x-0 p-6 bg-linear-to-t from-white/90 to-transparent pointer-events-none">
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter opacity-20 uppercase">
                    {patternName}
                </h2>
            </div>
        </div>
    );
};
