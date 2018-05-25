import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-minify';

import pkg from "./package.json";

export default {
	input: 'src/index.js',
	output: [
		{ file: pkg.main, format: 'umd', name: 'VueReduxPrepareProps' },
		{ file: pkg.module, format: 'es' }
	],
	//sourcemap: true,

	// entry: 'src/index.js',
	// dest: (process.env.NODE_ENV === 'production'? 'dist/vue-redux-prepare-props.full.js' : 'dist/vue-redux-prepare-props.js'),
	// format: 'umd',
	// context: "window",
	// moduleName: 'sxRS',
	//sourceMap: true,

	plugins: [
		resolve({
			jsnext: true,
			browser: true
		}),
	
		commonjs(),
		babel({
			babelrc: false,
			presets: ["es2015-rollup"],
			plugins: [
				"transform-object-rest-spread",
				"transform-regenerator",
				"syntax-async-functions",
				"transform-es2015-typeof-symbol",
			],
			ignore: [
				"package.json",
			]
		}),
		replace({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		progress({
			clearLine: false // default: true
		}),
		json(),
		(process.env.NODE_ENV === 'production'? minify({umd: 'dist/vue-redux-prepare-props.min.js'}) : ''),
	]
};