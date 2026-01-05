// src/components/tools/WagaraGenerator/patterns.ts

export type WagaraPatternType =
    | 'seigaiha'
    | 'asanoha'
    | 'shippou'
    | 'ichimatsu'
    | 'yagasuri';

export interface WagaraPattern {
    id: WagaraPatternType;
    name: string;
    yomi: string;
    description: string;
    // 色と透明度を受け取り、エンコードされたSVG文字列(Data URI)を返す関数
    getSvg: (color: string, bgColor: string, opacity: number) => string;
}

// SVGをBase64ではなく、URLエンコードしてCSSで使える形式にするヘルパー
const encodeSVG = (svgString: string) => {
    return `data:image/svg+xml,${encodeURIComponent(
        svgString.trim().replace(/\s+/g, ' ')
    )}`;
};

export const PATTERNS: WagaraPattern[] = [
    {
        id: 'seigaiha',
        name: '青海波',
        yomi: 'Seigaiha',
        description:
            '無限に広がる波の文様。未来永劫へと続く幸せへの願いが込められています。',
        getSvg: (color, bgColor, opacity) => {
            // SVG定義 (200x100の繰り返し)
            // fill-opacityで透明度を制御
            const svg = `
                <svg xmlns='http://www.w3.org/2000/svg' width='100' height='50' viewBox='0 0 100 50'>
                    <rect width='100%' height='100%' fill='${bgColor}'/>
                    <g fill='${color}' fill-opacity='${opacity}'>
                         <path d="M0 50 A50 50 0 0 1 100 50 A50 50 0 0 1 200 50 A50 50 0 0 1 100 50 Z" fill="none" stroke="${color}" stroke-width="2" />
                         <circle cx="50" cy="50" r="40" stroke="${color}" stroke-width="2" fill="none" />
                         <circle cx="50" cy="50" r="30" stroke="${color}" stroke-width="2" fill="none" />
                         <circle cx="50" cy="50" r="20" stroke="${color}" stroke-width="2" fill="none" />
                         <circle cx="50" cy="50" r="10" stroke="${color}" stroke-width="2" fill="none" />
                         
                         <circle cx="0" cy="50" r="40" stroke="${color}" stroke-width="2" fill="none" />
                         <circle cx="100" cy="50" r="40" stroke="${color}" stroke-width="2" fill="none" />
                    </g>
                </svg>
            `;
            return encodeSVG(svg);
        },
    },
    {
        id: 'ichimatsu',
        name: '市松',
        yomi: 'Ichimatsu',
        description:
            '途切れることなく続く格子柄。繁栄の意味が込められています。',
        getSvg: (color, bgColor, opacity) => {
            // 市松はシンプル: 20x20の中に10x10の正方形が2つ
            const svg = `
                <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
                    <rect width='40' height='40' fill='${bgColor}'/>
                    <g fill='${color}' fill-opacity='${opacity}'>
                        <rect x='0' y='0' width='20' height='20'/>
                        <rect x='20' y='20' width='20' height='20'/>
                    </g>
                </svg>
            `;
            return encodeSVG(svg);
        },
    },
];
