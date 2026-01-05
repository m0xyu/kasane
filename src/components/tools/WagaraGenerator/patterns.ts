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
    // color: 柄の色 (Hex), bgColor: 背景色 (Hex), opacity: 透明度 (0-1), strokeWidth: 線の太さ
    getSvg: (
        color: string,
        bgColor: string,
        opacity: number,
        strokeWidth?: number
    ) => string;
}

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
        description: '無限に広がる波の文様。未来永劫へと続く幸せへの願い。',
        getSvg: (color, bgColor, opacity) => {
            const svg = `
                <svg xmlns='http://www.w3.org/2000/svg' width='100' height='50' viewBox='0 0 120 60' preserveAspectRatio='none'>
                    <rect width='100%' height='100%' fill='${bgColor}'/>
                    
                    <path fill='${color}' fill-opacity='${opacity}' d='M13.005 31.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM-46.995 61.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zM73.005 61.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zM-46.995 1.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM73.005 1.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM50.352-2.630a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133z'/>
                </svg>
            `;
            return encodeSVG(svg);
        },
    },
    {
        id: 'asanoha',
        name: '麻の葉',
        yomi: 'Asanoha',
        description:
            '六角形の幾何学模様。成長が早く真っ直ぐ伸びることから、健やかな成長を願う柄。',
        getSvg: (color, bgColor, opacity, strokeWidth = 1) => {
            const svg = `
                <svg xmlns='http://www.w3.org/2000/svg' width='30' height='52' viewBox='0 0 30 52'>
                    <rect width='100%' height='100%' fill='${bgColor}'/>
                    <g fill='none' stroke='${color}' stroke-width='${strokeWidth}' stroke-opacity='${opacity}'>
                        <path d='M15,0 L15,52' />
                        <path d='M0,0 L30,26 M0,52 L30,26' />
                        <path d='M0,26 L30,0 M0,26 L30,52' />
                        <path d='M0,13 L30,13 M0,39 L30,39' opacity='0' /> <path d='M0,26 L15,13 L30,26 L15,39 Z' />
                        <path d='M15,13 L0,0 M15,13 L30,0' />
                        <path d='M15,39 L0,52 M15,39 L30,52' />
                    </g>
                </svg>
            `;
            return encodeSVG(svg);
        },
    },
    {
        id: 'shippou',
        name: '七宝',
        yomi: 'Shippou',
        description:
            '円が永遠に連鎖する柄。円満、調和、ご縁などの願いが込められています。',
        getSvg: (color, bgColor, opacity, strokeWidth = 1.5) => {
            const svg = `
                <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
                    <rect width='100%' height='100%' fill='${bgColor}'/>
                    <g fill='none' stroke='${color}' stroke-width='${strokeWidth}' stroke-opacity='${opacity}'>
                        <circle cx='30' cy='30' r='30' />
                        <circle cx='0' cy='0' r='30' />
                        <circle cx='60' cy='0' r='30' />
                        <circle cx='0' cy='60' r='30' />
                        <circle cx='60' cy='60' r='30' />
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
            const svg = `
                <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
                    <rect width='100%' height='100%' fill='${bgColor}'/>
                    <g fill='${color}' fill-opacity='${opacity}'>
                        <rect x='0' y='0' width='20' height='20'/>
                        <rect x='20' y='20' width='20' height='20'/>
                    </g>
                </svg>
            `;
            return encodeSVG(svg);
        },
    },
    {
        id: 'yagasuri',
        name: '矢絣',
        yomi: 'Yagasuri',
        description:
            '矢の羽を模した柄。戻らないことから縁起が良いとされ、卒業式の袴などで有名。',
        getSvg: (color, bgColor, opacity, strokeWidth = 2) => {
            const svg = `
                <svg xmlns='http://www.w3.org/2000/svg' width='40' height='60' viewBox='0 0 40 60'>
                    <rect width='100%' height='100%' fill='${bgColor}'/>
                    <g fill='none' stroke='${color}' stroke-width='${strokeWidth}' stroke-opacity='${opacity}' stroke-linecap='square'>
                        <line x1='20' y1='0' x2='20' y2='60' />
                        <path d='M20,10 L0,20' />
                        <path d='M20,30 L0,40' />
                        <path d='M20,50 L0,60' />
                        <path d='M20,-10 L0,0' /> <path d='M20,10 L40,0' />
                        <path d='M20,30 L40,20' />
                        <path d='M20,50 L40,40' />
                        <path d='M20,70 L40,60' /> </g>
                </svg>
            `;
            return encodeSVG(svg);
        },
    },
];
