// src/components/common/HeaderMenu.tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { dropdownItems } from '../../data/dropdownItems';

const HeaderMenu = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="group flex items-center gap-1 hover:text-stone-500 focus-visible:ring-2 focus-visible:ring-offset-2 outline-none transition-colors">
                Tools
                <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="bg-[#fcfaf2]/90 backdrop-blur-sm border border-stone-200 rounded-lg shadow-xl p-2 min-w-70 z-50 animate-in fade-in zoom-in-95 duration-200"
                    sideOffset={8}
                    align="start"
                >
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

                    <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default HeaderMenu;
