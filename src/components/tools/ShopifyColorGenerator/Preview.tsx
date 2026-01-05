// src/components/tools/ShopifyColorGenerator/Preview.tsx
import React from 'react';
import type { HorizonSettings } from './types';
import { ShoppingBag, ChevronDown, Search } from 'lucide-react';

interface Props {
    s: HorizonSettings;
}

export const Preview = ({ s }: Props) => {
    return (
        <div className="w-full h-full min-h-130 border border-stone-200 rounded-xl overflow-hidden shadow-sm flex flex-col font-sans transition-colors duration-300">
            <header
                className="border-b sticky top-0 z-10 backdrop-blur-sm bg-opacity-90"
                style={{
                    borderColor: s.border,
                }}
            >
                <div
                    className="px-6 py-3 text-center text-xs font-medium"
                    style={{
                        backgroundColor: s.background,
                        color: s.foreground,
                    }}
                >
                    <span>Free shipping on orders over ¥10,000.</span>
                </div>
                <div className="px-6 py-2 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                        <Search className="w-5 h-5 opacity-70" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        KASANE
                    </span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium hidden md:block">
                            Log in
                        </span>
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                </div>
            </header>

            {/* --- Main Content --- */}
            <div
                className="flex-1 p-6 md:p-10 flex flex-col gap-12 overflow-y-auto"
                style={{ backgroundColor: s.background }}
            >
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="flex-1 bg-stone-100 rounded-none aspect-4/5 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-4xl font-bold tracking-widest">
                            IMG
                        </div>
                    </div>

                    <div className="flex-1 space-y-8">
                        <div>
                            <span
                                className="text-xs font-bold uppercase tracking-widest mb-2 block"
                                style={{ color: s.primary }}
                            >
                                New Collection
                            </span>
                            <h1 className="text-3xl md:text-4xl font-medium mb-2">
                                Traditional Haori Jacket
                            </h1>
                            <div className="flex items-center gap-4">
                                <span className="text-lg opacity-60 line-through">
                                    ¥32,000
                                </span>
                                <span className="text-xl font-medium">
                                    ¥24,000
                                </span>
                                <span
                                    className="text-xs px-2 py-1 rounded-full uppercase"
                                    style={{
                                        backgroundColor: s.primary,
                                        color: s.primary_button_text,
                                    }}
                                >
                                    Sale
                                </span>
                            </div>
                        </div>

                        {/* Variant Picker */}
                        <div className="space-y-3">
                            <span className="text-sm opacity-80">Size</span>
                            <div className="flex flex-wrap gap-2">
                                {['S', 'M', 'L'].map((size, i) => (
                                    <button
                                        key={size}
                                        className="w-14 h-8 flex items-center justify-center rounded-xl text-sm border transition-all"
                                        style={{
                                            backgroundColor:
                                                i === 1
                                                    ? s.selected_variant_background_color
                                                    : s.variant_background_color,
                                            color:
                                                i === 1
                                                    ? s.selected_variant_text_color
                                                    : s.variant_text_color,
                                            borderColor:
                                                i === 1
                                                    ? s.selected_variant_border_color
                                                    : s.variant_border_color,
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 pt-4">
                            <div className="flex gap-4 mb-4">
                                <div className="w-32 flex items-center justify-between px-4 py-3 border rounded-xl">
                                    <span>-</span>
                                    <span>1</span>
                                    <span>+</span>
                                </div>
                            </div>
                            <button
                                className="w-full py-3 px-6 rounded-xl font-medium shadow-sm transition-all hover:opacity-90 active:scale-[0.99]"
                                style={{
                                    backgroundColor:
                                        s.primary_button_background,
                                    color: s.primary_button_text,
                                    borderColor: s.primary_button_border,
                                    borderWidth: '1px',
                                }}
                            >
                                Add to cart
                            </button>
                            <button
                                className="w-full py-3 px-6 rounded-xl font-medium transition-all hover:opacity-80"
                                style={{
                                    color: s.secondary_button_text,
                                    borderColor: s.secondary_button_border,
                                    borderWidth: '1px',
                                }}
                            >
                                Buy it now
                            </button>
                        </div>

                        <p
                            className="text-xs leading-relaxed border-t pt-6"
                            style={{
                                borderColor: s.border,
                                color: s.foreground,
                            }}
                        >
                            Free shipping on orders over ¥10,000. <br />
                            We ship worldwide from Japan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
