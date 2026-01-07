// src/components/common/HeaderMenu.tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { dropdownItems } from '../../data/dropdownItems';
import { Home, Info, MenuIcon, Palette, X } from 'lucide-react';

const MobileMenu = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="group flex items-center gap-1 hover:text-stone-500 focus-visible:ring-2 focus-visible:ring-offset-2 outline-none transition-colors">
                <MenuIcon className="w-6 h-6 group-data-[state=open]:hidden" />
                <X className="w-6 h-6 group-data-[state=closed]:hidden" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="bg-[#fcfaf2]/90 backdrop-blur-sm border border-stone-200 rounded-lg shadow-xl p-2 min-w-70 w-full z-50"
                    sideOffset={5}
                    align="end"
                >
                    <div className="px-2 py-1.5 text-xs font-bold text-stone-400 uppercase tracking-widest">
                        Tools
                    </div>
                    {dropdownItems.map(({ icon: Icon, label, desc, url }) => (
                        <DropdownMenu.Item
                            key={url}
                            asChild
                            className="flex items-center gap-2 p-2 rounded hover:bg-stone-100 cursor-pointer"
                        >
                            <a
                                aria-current="page"
                                href={url}
                                className="block p-3"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 w-8 h-8 bg-stone-200 group-hover/item:bg-white group-hover/item:shadow-sm transition-all rounded-full flex items-center justify-center text-stone-500 group-hover/item:text-slate-800">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-slate-600 mb-0.5">
                                            {label}
                                        </p>
                                        <p className="text-xs text-stone-500 leading-tight">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </DropdownMenu.Item>
                    ))}
                    <DropdownMenu.Separator className="h-px bg-stone-200 my-2" />

                    <div className="px-2 py-1.5 text-xs font-bold text-stone-400 uppercase tracking-widest">
                        Menu
                    </div>

                    <DropdownMenu.Item asChild>
                        <a
                            href="/"
                            className="flex items-center text-sm gap-3 p-3 rounded hover:bg-stone-100 cursor-pointer outline-none text-slate-800 font-medium"
                        >
                            Home
                        </a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                        <a
                            href="/colors"
                            className="flex items-center text-sm gap-3 p-3 rounded hover:bg-stone-100 cursor-pointer outline-none text-slate-800 font-medium"
                        >
                            Colors
                        </a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                        <a
                            href="/about"
                            className="flex items-center text-sm gap-3 p-3 rounded hover:bg-stone-100 cursor-pointer outline-none text-slate-800 font-medium"
                        >
                            About
                        </a>
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default MobileMenu;
