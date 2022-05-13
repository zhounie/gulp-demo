import { series, src, dest } from 'gulp'
import { buildTs } from './build'
import { spawn } from 'child_process'

const run = (command: string) => {
    return new Promise((resolve, reject) => {
        const [cwd, ...args] = command.split(' ')

        const app = spawn(cwd, args, {
            shell: process.platform === 'win32'
        })

        const onProcessExit = () => app.kill('SIGHUP')

        app.on('close', (code) => {
            process.removeListener('exit', onProcessExit)
            if (code === 0) {
                resolve(code)
            } else {
                reject(
                    new Error(`执行 ${command} 命令失败。Code: ${code}。`)
                )
            }
        })
        process.on('exit', onProcessExit)
    })
}

const clear = async () => await run('npm run clear')

export default series(
    clear,
    buildTs
)