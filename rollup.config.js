import commonjs from '@rollup/plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

export default (args) => {
  const plugins = [
    eslint(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    resolve(),
    commonjs(),
  ]

  args.terse &&
    plugins.push(
      terser({
        compress: true,
        mangle: true,
      })
    )

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
    plugins,
  }
}
