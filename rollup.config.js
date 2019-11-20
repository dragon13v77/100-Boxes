import babel from 'rollup-plugin-babel';
import { eslint }  from 'rollup-plugin-eslint';

export default {
    input: './app.js',
        output: {
        file: './dist/fat_cat.js',
            format: 'esm',
            sourcemap: true,
            treeshake: false
    },
    plugins: [
        eslint({
            exclude: []
        }),
        babel({
            exclude: 'node_modules/**'
        })
    ]
};