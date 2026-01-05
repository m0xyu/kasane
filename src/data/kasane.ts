// src/data/kasane.ts

export interface KasaneScheme {
    name: string;
    yomi: string;
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    description?: string;
    colors: string[];
}

export const KASANE_PRESETS: KasaneScheme[] = [
    // --- 春 (Spring) ---
    {
        name: '桜',
        yomi: 'Sakura',
        season: 'spring',
        colors: ['#FFFFFF', '#FEDFE1', '#DC9FB4', '#934e61'], // 白・桜色・紅梅・蘇芳
    },
    {
        name: '桃',
        yomi: 'Momo',
        season: 'spring',
        colors: ['#F596AA', '#F4A7B9', '#EB6EA0', '#8F2E14'],
    },
    {
        name: '藤',
        yomi: 'Fuji',
        season: 'spring',
        colors: ['#89729E', '#C4A3BF', '#A5DEE4', '#86C166'], // 藤色・藤紫・水色・萌黄（高貴でエレガント）
    },
    {
        name: '山吹',
        yomi: 'Yamabuki',
        season: 'spring',
        colors: ['#F8B500', '#FFD900', '#A8D8B9', '#82AE46'], // 山吹・刈安・若葉・鶸色（鮮やかな黄金と緑）
    },

    // --- 夏 (Summer) ---
    {
        name: '若菖蒲',
        yomi: 'Wakashobu',
        season: 'summer',
        colors: ['#F0F6DA', '#D7C4BB', '#6A4C9C', '#4d3975'],
    },
    {
        name: '蝉の羽',
        yomi: 'Seminoha',
        season: 'summer',
        colors: ['#3A5B52', '#7B90D2', '#A5DEE4', '#D0E2E6'],
    },
    {
        name: '紫陽花',
        yomi: 'Ajisai',
        season: 'summer',
        colors: ['#3A4480', '#A0D8EF', '#D4C9EA', '#E0EBDF'], // 紺吉梗・空色・藤鼠・白緑（雨季の涼しさ）
    },
    {
        name: '夏木立',
        yomi: 'Natsukodachi',
        season: 'summer',
        colors: ['#00552E', '#69821B', '#93CA76', '#F2F2F2'], // 深緑・苔色・萌黄・卯の花（深い緑と光）
    },

    // --- 秋 (Autumn) ---
    {
        name: '紅葉',
        yomi: 'Momiji',
        season: 'autumn',
        colors: ['#F8B500', '#D05A6E', '#DB4D6D', '#592C28'],
    },
    {
        name: '初霜',
        yomi: 'Hatsushimo',
        season: 'autumn',
        colors: ['#FFFFFF', '#D9D9D9', '#7B90D2', '#2D2D2D'],
    },
    {
        name: '萩',
        yomi: 'Hagi',
        season: 'autumn',
        colors: ['#D05A6E', '#E6CDE3', '#69B076', '#381C1A'], // 蘇芳・藤鼠・萌黄・焦茶（秋の七草）
    },
    {
        name: '桔梗',
        yomi: 'Kikyo',
        season: 'autumn',
        colors: ['#5654A2', '#A59ACA', '#EAF4FC', '#4D5237'], // 桔梗・藤鼠・月白・海松（凛とした秋の気配）
    },

    // --- 冬 (Winter) ---
    {
        name: '氷室',
        yomi: 'Himuro',
        season: 'winter',
        colors: ['#FFFFFF', '#A5DEE4', '#7B90D2', '#1E50A2'],
    },
    {
        name: '椿',
        yomi: 'Tsubaki',
        season: 'winter',
        colors: ['#C7372F', '#FFFFFF', '#F8B500', '#3A5B52'],
    },
    {
        name: '松',
        yomi: 'Matsu',
        season: 'winter',
        colors: ['#00552E', '#4A593D', '#6F4B3E', '#BFA46F'], // 深緑・老竹・焦茶・唐茶（常盤の緑）
    },
    {
        name: '雪の下',
        yomi: 'Yukinoshita',
        season: 'winter',
        colors: ['#FFFFFF', '#F2F2F2', '#E16B8C', '#5B3241'], // 白・胡粉・紅梅・蘇芳（雪の下に咲く梅）
    },
];
