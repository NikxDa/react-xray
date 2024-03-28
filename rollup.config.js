import typescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser';

import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/XRay.tsx',
    output: [
        {
            file: 'dist/XRay.js',
            format: 'esm',
            exports: 'named',
            sourcemap: true,
            strict: false
        }
    ],
    plugins: [
        typescript(),
        terser()
    ]
})