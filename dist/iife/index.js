(function (exports) {
    'use strict';

    const str = 'hello';
    var arr = ['1', '2', '3'];
    let string = 'world';

    function fn() {
        console.log(str);
        console.log(arr);
        console.log(string);
    }

    fn();

    exports.fn = fn;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=index.js.map
