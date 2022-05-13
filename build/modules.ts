import { rollup, OutputOptions } from 'rollup'
import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import esbuild from 'rollup-plugin-esbuild'



const rootPath = path.resolve(__dirname, '..')
const srcPath = path.resolve(rootPath, 'src')
const outputPath = path.resolve(rootPath, 'dist')

type Module = ['esm', 'cjs'][number]

const buildConfig: Record<Module, OutputOptions> = {
    esm: {
        format: 'esm',
        dir: path.resolve(outputPath, 'es'),
        sourcemap: true,
        entryFileNames: `[name].mjs`
    },
    // iife: {
    //     format: 'iife',
    //     dir: path.resolve(outputPath, 'iife'),
    //     sourcemap: true,
    //     entryFileNames: `[name].js`
    // },
    cjs: {
        format: 'cjs',
        dir: path.resolve(outputPath, 'lib'),
        exports: 'named',
        sourcemap: true,
        entryFileNames: `[name].js`
    }
}


export const buildTs = async () => {
    const input = await glob('src/**/*.{js,ts,vue}', {})
    const bundle = await rollup({
        input: input,
        plugins: [
            vue(),
            vueJsx(),
            nodeResolve(),
            typescript(),
            commonjs(),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
                include: ['src/*'],
                exclude: 'node_modules/**'
            }),
            esbuild({
                loaders: {
                    '.vue': 'ts'
                }
            })
        ],
    })

    Object.entries(buildConfig).map(async ([module, option]) => {
        return await bundle.write(option)
    })
}