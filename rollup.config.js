import typescript from 'rollup-plugin-typescript2'
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
        typescript()
    ],
    external: ['react', 'react-dom']
}