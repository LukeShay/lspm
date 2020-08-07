import commonjs from '@rollup/plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

export default (args) => {
  const terser = args.terse ? terser({
    compress: true,
    mangle: true,
  }) : undefined;

  delete args.terse

  return {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        name: 'lspm',
        esModule: true,
      },
    ],
    plugins: [
      eslint(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      terser,
      resolve(),
      commonjs(),
    ],
  }
}
