const str = 'hello'
var arr = ['1', '2', '3']
let string = 'world'
import _ from 'lodash'

let foo = (str: string) => {
    console.log(`hello ${string}`)
}
foo(string)

export function fn() {
    console.log(str)
    console.log(arr)
    console.log(string)
    console.log(`hello ${string}`)
    _.last([1,2,3])
}

fn()