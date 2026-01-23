// src/components/tools/ShopifyColorGenerator/useHorizonLogic.ts
import { useState, useMemo } from 'react';
import chroma from 'chroma-js';
import type { HorizonSettings } from './types';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export const useHorizonLogic = () => {
    // 1. ブランドカラー (Primary)
    const [brandColor, setBrandColor] = useLocalStorage<string>(
        'kasane-horizon-brand',
        '#DC9FB4',
    );

    // 2. 背景色 (Background) - 自由設定可能に
    const [bgColor, setBgColor] = useLocalStorage<string>(
        'kasane-horizon-bg',
        '#FFFFFF',
    );

    const settings: HorizonSettings = useMemo(() => {
        const primary = chroma.valid(brandColor) ? brandColor : '#DC9FB4';
        const bg = chroma.valid(bgColor) ? bgColor : '#FFFFFF';

        // 背景の明るさを判定 (4.5以上なら暗い背景とみなす)
        const isDarkBg = chroma.contrast(bg, '#FFFFFF') > 4.5;
        // ベース文字色: 背景が暗ければ白、明るければ黒
        // ブランドカラーを 5% 混ぜて、サイト全体の統一感を出す
        const rawFg = isDarkBg
            ? chroma.mix('#FFFFFF', primary, 0.05).hex()
            : chroma.mix('#121212', primary, 0.05).hex();

        // ブランドカラーが背景に近い色の場合、文字色が見づらくなるので調整
        // console.log(chroma.contrast(bg, rawFg));
        const fg =
            chroma.contrast(bg, rawFg) >= 4.5
                ? rawFg
                : isDarkBg
                  ? '#FFFFFF'
                  : '#121212';

        const fgHeading = fg;

        const isBgSimilarToPrimary = chroma.distance(bg, primary) < 20;
        let btnBg, btnText, btnBorder;
        if (isBgSimilarToPrimary) {
            btnBg = fg;
            btnText = primary;
            btnBorder = fg;
        } else {
            btnBg = primary;
            btnText =
                chroma.contrast(primary, '#FFFFFF') > 4.5
                    ? '#FFFFFF'
                    : '#121212';
            btnBorder = primary;
        }

        const btnHoverBg = isBgSimilarToPrimary
            ? chroma(fg).alpha(0.9).hex() // 反転時は少し透明に
            : chroma(primary).darken(0.1).hex(); // 通常時は少し暗く

        const btnHoverText = isBgSimilarToPrimary ? primary : btnText;

        const borderBase = chroma(primary).alpha(0.2).hex();
        const secondaryBorder = chroma(primary).darken(1.1).hex();

        const inputBg = isDarkBg ? 'rgba(255, 255, 255, 0.2)' : '#FFFFFF';
        const inputText = fg;

        return {
            background: bg,
            foreground_heading: fgHeading,
            foreground: chroma(fg).alpha(0.85).hex(),
            primary: primary,
            primary_hover: chroma(primary).darken(0.1).hex(),
            border: borderBase,
            shadow: chroma(fg).alpha(0.1).hex(),

            primary_button_background: btnBg,
            primary_button_text: btnText,
            primary_button_border: btnBorder,
            primary_button_hover_background: btnHoverBg,
            primary_button_hover_text: btnHoverText,
            primary_button_hover_border: btnHoverBg,

            secondary_button_background: 'transparent',
            secondary_button_text: fg,
            secondary_button_border: secondaryBorder,
            secondary_button_hover_background: chroma(fg).alpha(0.05).hex(),
            secondary_button_hover_text: fg,
            secondary_button_hover_border: fg,

            input_background: inputBg,
            input_text_color: inputText,
            input_border_color: borderBase,
            input_hover_background: isDarkBg
                ? 'rgba(255,255,255,0.2)'
                : '#F9F9F9',

            variant_background_color: 'transparent',
            variant_text_color: fg,
            variant_border_color: borderBase,
            variant_hover_background_color: chroma(fg).alpha(0.05).hex(),
            variant_hover_text_color: fg,
            variant_hover_border_color: borderBase,

            selected_variant_background_color: btnBg,
            selected_variant_text_color: btnText,
            selected_variant_border_color: btnBg,
            selected_variant_hover_background_color: btnHoverBg,
            selected_variant_hover_text_color: btnHoverText,
            selected_variant_hover_border_color: btnHoverBg,
        };
    }, [brandColor, bgColor]);

    const jsonOutput = useMemo(() => {
        const schemeData = {
            settings: settings,
        };

        const output = {
            'scheme-kasane-custom': schemeData,
        };

        const jsonString = JSON.stringify(output, null, 2);
        return jsonString.substring(1, jsonString.length - 1).trim();
    }, [settings]);

    return {
        brandColor,
        setBrandColor,
        bgColor,
        setBgColor,
        settings,
        jsonOutput,
    };
};
