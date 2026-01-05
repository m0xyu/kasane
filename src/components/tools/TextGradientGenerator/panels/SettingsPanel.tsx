// src/components/tools/TextGradientGenerator/panels/SettingsPanel.tsx
import { Check, Copy, Settings2, Wind } from 'lucide-react';
import { useState } from 'react';
import type { DirectionType } from '../useTextGradient';

interface Props {
    direction: number;
    setDirection: (deg: number) => void;
    directionType: DirectionType;
    setDirectionType: (type: DirectionType) => void;
    gradientString: string;
    directionTypes: readonly DirectionType[];
}

export const SettingsPanel = ({
    direction,
    setDirection,
    directionType,
    setDirectionType,
    gradientString,
    directionTypes,
}: Props) => {
    const [copied, setCopied] = useState(false);
    const [copiedTailwind, setCopiedTailwind] = useState(false);

    const copyCSS = async () => {
        const css = `background: ${gradientString};\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;\nbackground-clip: text;`;
        await navigator.clipboard.writeText(css);
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

    const copyTailwindCSS = async () => {
        let val = gradientString.replace(/, /g, ',');
        val = val.replace(/ /g, '_');
        const tailwindClass = `bg-[${val}] bg-clip-text text-transparent`;

        await navigator.clipboard.writeText(tailwindClass);

        setCopiedTailwind(true);
        setTimeout(() => setCopiedTailwind(false), 2000);

        window.dispatchEvent(
            new CustomEvent('toast', {
                detail: {
                    message: 'Tailwind CSS class copied to clipboard!',
                    type: 'success',
                },
            })
        );
    };

    return (
        <div className="w-full lg:w-72 bg-white border-l border-stone-200 p-6 flex flex-col gap-8">
            {/* Gradient Direction */}
            <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <Settings2 className="w-4 h-4" /> Settings
                </h3>

                <div className="mb-6">
                    <p className="text-xs font-bold text-stone-400 uppercase block mb-2">
                        Direction Type ({directionType})
                    </p>
                    <fieldset className="flex gap-4">
                        {directionTypes.map((type) => (
                            <div key={type} className="flex items-center gap-1">
                                <input
                                    id={type}
                                    type="radio"
                                    name="direction-type"
                                    value={type}
                                    checked={type === directionType}
                                    onChange={() => setDirectionType(type)}
                                    className="accent-slate-800"
                                />
                                <label
                                    htmlFor={type}
                                    className={`text-xs font-bold ${
                                        type === directionType
                                            ? 'text-slate-800'
                                            : 'text-stone-400'
                                    }`}
                                >
                                    {type}
                                </label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                {directionType !== 'radial' && (
                    <div className="mb-6">
                        <label className="text-xs font-bold text-stone-400 uppercase block mb-2">
                            Direction ({direction}°)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={direction}
                            onChange={(e) =>
                                setDirection(Number(e.target.value))
                            }
                            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                        />
                        <div className="flex justify-between mt-2">
                            {[0, 90, 180, 270].map((deg) => (
                                <button
                                    key={deg}
                                    onClick={() => setDirection(deg)}
                                    className={`text-xs px-2 py-1 rounded ${
                                        direction === deg
                                            ? 'bg-slate-100 text-slate-800 font-bold'
                                            : 'text-stone-400 hover:text-stone-600'
                                    }`}
                                >
                                    {deg}°
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-auto space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-stone-400 uppercase">
                            CSS Code
                        </label>
                        <button
                            onClick={copyCSS}
                            className="text-xs flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                        >
                            {copied ? (
                                <Check className="w-3 h-3 text-green-500" />
                            ) : (
                                <Copy className="w-3 h-3" />
                            )}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div className="relative group">
                        <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                            <code>
                                {`background: ${gradientString}; 
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;`}
                            </code>
                        </pre>
                    </div>
                </div>

                {/* --- Tailwind CSS Export (New!) --- */}
                <button
                    onClick={copyTailwindCSS}
                    className={`
                    w-full py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 border
                    ${
                        copiedTailwind
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-white text-slate-600 border-stone-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-sm'
                    }
                `}
                >
                    {copiedTailwind ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <Wind className="w-4 h-4" />
                    )}
                    {copiedTailwind
                        ? 'Copied Tailwind Class!'
                        : 'Copy Tailwind Class'}
                </button>
            </div>
        </div>
    );
};
