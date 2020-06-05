import commonjs from '@rollup/plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

export default {
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
    process.env.TERSE &&
      terser({
        compress: true,
        mangle: true,
      }),
    resolve(),
    commonjs(),
  ],
}
