// src/components/tools/ShopifyColorGenerator/useHorizonLogic.ts
import { useState, useMemo } from 'react';
import chroma from 'chroma-js';
import type { HorizonSettings } from './types';

export const useHorizonLogic = () => {
    const [brandColor, setBrandColor] = useState('#DC9FB4');

    const generateSettings = (isBrandBackground: boolean): HorizonSettings => {
        const primary = brandColor;

        // Header用: ブランドカラー / Product用: 白
        const bg = isBrandBackground ? primary : '#FFFFFF';

        // 2. 基本文字色の決定
        // 背景色に対するコントラスト比で白か黒かを判定
        const isDarkBg = chroma.contrast(bg, '#FFFFFF') > 4.5;
        const baseFg = isDarkBg ? '#FFFFFF' : '#121212';

        const fgHeading = baseFg;
        const fg = baseFg;
        const borderBase = chroma(primary).alpha(0.3).hex();

        // 入力欄 (Product用など白背景の時は、入力欄を少しグレーにするか白のまま枠線をつける)
        const inputBg = isDarkBg ? 'rgba(255,255,255, 0.1)' : '#FFFFFF';
        const inputText = baseFg;
        const inputBorder = chroma(baseFg).alpha(0.2).hex();

        const primaryHover = chroma(primary).darken(0.5).hex();

        let btnBg, btnText, btnBorder;

        if (isBrandBackground) {
            btnBg = baseFg;
            btnText = primary;
            btnBorder = baseFg;
        } else {
            btnBg = primary;
            btnText =
                chroma.contrast(primary, '#FFFFFF') > 4.5
                    ? '#FFFFFF'
                    : '#121212';
            btnBorder = primary;
        }

        const btnHoverBg = isBrandBackground
            ? chroma(baseFg).alpha(0.9).hex()
            : chroma(primary).darken(0.1).hex();

        const btnHoverText = isBrandBackground ? primary : btnText;

        return {
            background: bg,
            foreground_heading: fgHeading,
            foreground: chroma(fg)
                .alpha(isDarkBg ? 0.9 : 0.8)
                .hex(),
            primary: primary,
            primary_hover: primaryHover,
            border: borderBase,
            shadow: chroma('#000000').alpha(0.1).hex(),

            primary_button_background: btnBg,
            primary_button_text: btnText,
            primary_button_border: btnBorder,
            primary_button_hover_background: btnHoverBg,
            primary_button_hover_text: btnHoverText,
            primary_button_hover_border: btnHoverBg,

            secondary_button_background: 'transparent',
            secondary_button_text: chroma(primary).darken(1.1).hex(),
            secondary_button_border: chroma(primary).darken(1.1).hex(),
            secondary_button_hover_background: chroma(baseFg).alpha(0.1).hex(),
            secondary_button_hover_text: baseFg,
            secondary_button_hover_border: baseFg,

            input_background: inputBg,
            input_text_color: inputText,
            input_border_color: inputBorder,
            input_hover_background: chroma(inputBg).darken(0.05).hex(),

            variant_background_color: 'transparent',
            variant_text_color: baseFg,
            variant_border_color: borderBase,
            variant_hover_background_color: chroma(baseFg).alpha(0.1).hex(),
            variant_hover_text_color: baseFg,
            variant_hover_border_color: borderBase,

            selected_variant_background_color: btnBg,
            selected_variant_text_color: btnText,
            selected_variant_border_color: btnBg,
            selected_variant_hover_background_color: btnHoverBg,
            selected_variant_hover_text_color: btnHoverText,
            selected_variant_hover_border_color: btnHoverBg,
        };
    };

    const headerSettings = useMemo(() => generateSettings(true), [brandColor]); // 背景=Brand
    const productSettings = useMemo(
        () => generateSettings(false),
        [brandColor]
    );

    const createJson = (name: string, data: HorizonSettings) => {
        return JSON.stringify(
            {
                color_schemes: {
                    [`scheme-${name}`]: { settings: data },
                },
            },
            null,
            2
        );
    };

    const headerJson = useMemo(
        () => createJson('kasane-header', headerSettings),
        [headerSettings]
    );
    const productJson = useMemo(
        () => createJson('kasane-product', productSettings),
        [productSettings]
    );

    return {
        brandColor,
        setBrandColor,
        headerSettings,
        productSettings,
        headerJson,
        productJson,
    };
};
