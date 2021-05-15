const pkg = require('./package.json');

require('esbuild').buildSync({
    entryPoints: ['./src/XRay.jsx'],
    outfile: 'dist/xray.js',
    bundle: true,
    minify: true,
    format: "cjs",
    external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies || {})
    ],
});