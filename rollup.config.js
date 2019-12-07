import babel from 'rollup-plugin-babel';
import { eslint }  from 'rollup-plugin-eslint';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: './app.js',
        output: {
        file: './dist/bundle.js',
            format: 'esm',
            sourcemap: false,
            treeshake: false
    },
    plugins: [
        eslint({
            exclude: []
        }),
        babel({
            exclude: 'node_modules/**'
        }),
		uglify({
			sourcemap: false,
		}),
    ]
};