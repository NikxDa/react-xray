import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json'

export default {
    input: 'src/XRay.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: false
        }
    ],
    plugins: [
        typescript(),
        terser()
    ],
    external: ['react', 'react-dom']
}