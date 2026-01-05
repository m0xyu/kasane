// src/components/tools/WagaraGenerator/index.tsx
import { useWagara } from './useWagara';
import { Controls } from './Controls';
import { PatternPreview } from './PatternPreview';

export default function WagaraGenerator() {
    const {
        selectedPatternId,
        setSelectedPatternId,
        mainColor,
        setMainColor,
        bgColor,
        setBgColor,
        opacity,
        setOpacity,
        scale,
        setScale,
        currentPattern,
        svgUrl,
        cssCode,
    } = useWagara();

    return (
        <div className="grid lg:grid-cols-12 gap-8 items-start h-auto lg:h-200">
            <div className="lg:col-span-4 h-full">
                <Controls
                    selectedPatternId={selectedPatternId}
                    onSelectPattern={setSelectedPatternId}
                    mainColor={mainColor}
                    onMainColorChange={setMainColor}
                    bgColor={bgColor}
                    onBgColorChange={setBgColor}
                    opacity={opacity}
                    onOpacityChange={setOpacity}
                    scale={scale}
                    onScaleChange={setScale}
                />
            </div>

            <div className="lg:col-span-8 h-full min-h-125">
                <PatternPreview
                    svgUrl={svgUrl}
                    cssCode={cssCode}
                    scale={scale}
                    patternName={currentPattern.yomi} // 英語名を表示
                />
            </div>
        </div>
    );
}
