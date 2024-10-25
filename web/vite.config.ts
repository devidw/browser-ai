import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import unocss from "unocss/vite"
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
    plugins: [sveltekit(), unocss({
        transformers: [
            transformerDirectives(),
        ]
    }),]
});
