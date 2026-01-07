// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    site: 'https://kasane-palette.dev',
    integrations: [
        react(),
        sitemap(),
        partytown({
            config: {
                forward: ['dataLayer.push'],
            },
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});
