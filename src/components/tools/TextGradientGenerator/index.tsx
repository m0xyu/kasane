// src/components/tools/TextGradientGenerator/index.tsx
import { useTextGradient } from './useTextGradient';
import { ColorControlPanel } from './panels/ColorControlPanel';
import { PreviewPanel } from './panels/PreviewPanel';
import { SettingsPanel } from './panels/SettingsPanel';

export default function TextGradientGenerator() {
    const { state, actions, consts } = useTextGradient();

    return (
        <div className="flex flex-col lg:flex-row max-h-full min-h-125 bg-stone-50 rounded-xl overflow-hidden shadow-sm border border-stone-200">
            {/* 左：カラー操作 */}
            <ColorControlPanel
                colors={state.colors}
                onAdd={actions.addColor}
                onRemove={actions.removeColor}
                onUpdate={actions.updateColor}
                onRandomize={actions.randomize}
                setColors={actions.setColors}
            />

            {/* 中央：プレビュー */}
            <PreviewPanel
                text={state.previewText}
                setText={actions.setPreviewText}
                gradientString={state.gradientString}
                bgColor={state.bgColor}
                setBgColor={actions.setBgColor}
            />

            {/* 右：設定と書き出し */}
            <SettingsPanel
                direction={state.direction}
                setDirection={actions.setDirection}
                directionType={state.directionType}
                setDirectionType={actions.setDirectionType}
                gradientString={state.gradientString}
                directionTypes={consts.DIRECTION_TYPES}
            />
        </div>
    );
}
