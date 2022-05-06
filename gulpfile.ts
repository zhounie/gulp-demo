import { series, src, dest } from 'gulp'
import { buildTs } from './build'

// const jsfn = () => {
//     return src('src/*.ts')
//         .pipe(
//             dest('dist/', { sourcemaps: true })
//         )
// }




export default series(buildTs)