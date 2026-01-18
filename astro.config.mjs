// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), react()],
    // For Cloudflare Pages deployment, uncomment the following:
    // output: 'hybrid',
    // adapter: cloudflare(),

    // For local development, keep it simple (no adapter needed)
});