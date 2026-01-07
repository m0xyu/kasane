// src/types/menuItem.ts
import {
    Image,
    Palette,
    ShoppingBag,
    Type,
    Wind,
    type LucideIcon,
} from 'lucide-react';

export interface DropdownItem {
    icon: LucideIcon;
    label: string;
    desc: string;
    url: string;
}

export const dropdownItems: DropdownItem[] = [
    {
        icon: Type,
        label: 'Text Gradient Generator',
        desc: 'Generate beautiful text gradients',
        url: '/tools/text-gradient-generator',
    },
    {
        icon: Palette,
        label: 'Multi-Color Palette',
        desc: 'Japanese multi-color palette',
        url: '/tools/multi-color-palette',
    },
    {
        icon: Image,
        label: 'Wagara Generator',
        desc: 'Generate stunning wagara patterns',
        url: '/tools/wagara-generator',
    },
    {
        icon: Wind,
        label: 'Tailwind Palette',
        desc: 'Tailwind CSS color palettes',
        url: '/tools/tailwind-palette-generator',
    },
    {
        icon: ShoppingBag,
        label: 'Shopify Palette',
        desc: 'Shopify Horizon color schemes',
        url: '/tools/shopify-color-generator',
    },
];
