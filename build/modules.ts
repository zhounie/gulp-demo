import { rollup, OutputOptions } from 'rollup'
import path from 'path'

const rootPath = path.resolve(__dirname, '..')

const srcPath = path.resolve(rootPath, 'src')

const outputPath = path.resolve(rootPath, 'dist')

type Module = ['esm', 'cjs', 'iife'][number]

const buildConfig: Record<Module, OutputOptions> = {
    esm: {
        format: 'esm',
        dir: path.resolve(outputPath, 'es'),
        sourcemap: true,
        entryFileNames: `[name].mjs`
    },
    iife: {
        format: 'iife',
        dir: path.resolve(outputPath, 'iife'),
        sourcemap: true,
        entryFileNames: `[name].js`
    },
    cjs: {
        format: 'cjs',
        dir: path.resolve(outputPath, 'lib'),
        sourcemap: true,
        entryFileNames: `[name].js`
    }
}


export const buildTs = async () => {
    const bundle = await rollup({
        input: `${srcPath}/index.ts`
    })

    Object.entries(buildConfig).map(async ([module, option]) => {
        return await bundle.write(option)
    })
}