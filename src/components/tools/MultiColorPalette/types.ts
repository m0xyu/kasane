// src/components/tools/MultiColorPalette/types.ts

export interface PaletteColor {
    id: string; // Reactのkey用（UUIDなど）
    hex: string; // カラーコード (#RRGGBB)
    isLocked: boolean; // ロック状態
    name?: string; // 色の名前（伝統色名など、あれば）
}

// 伝統色の型（既存のcolors.jsonの型に合わせる）
export interface TraditionalColor {
    hex: string;
    name: string;
    yomi: string;
}
