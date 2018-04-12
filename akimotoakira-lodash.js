var akimotoakira = {

    chunk: function(array, size) {//n个一组剪切数组
        var result = [];
        for (var i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    },

    compact: function(array) {//筛选数组中true的值
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                result.push(array[i]);
            }
        }
        return result;
        // compact: (array) => array.filter(x => x),//compact箭头函数写法
    },

    difference: function(array, ...values) {//与参数对比找出不同项
        var result = [];
        var Val = values.reduce((a, b) => {
            return a.concat(b)
        });
        return result = array.filter(item => !Val.includes(item));
    },

    fill: function(array, value, start = 0,end = array.length) {//填充
        for (var i = start; i < end; i++) {
            array[i] = value;
        }
        return array;
    },

    drop: function(array, n = 1) {//从数组左边减去n个数，保留右边
        return array.slice(n);
    },

    dropRight: function(array, n = 1) {//同上，从右边开始
        if (n > array.length) {
            return [];
        }
        return array.slice(0, array.length - n);
    },

    dropRightWhile: function(array, predicate) {
        for(i = 0; i < array.length; i++) {
            if(predicate(array[i]) === false) {
                array.splice(0, i);
                return array;
            }
        }
    },

    flatten: function(array) {//展开数组（一层）
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (!isNaN(array[i])) {
                result.push(array[i]);
            }
            if (isNaN(array[i])) {
                for (var j = 0; j < array[i].length; j++) {
                    result.push(array[i][j]);
                }
            }
        }
        return result;
        // flatten: (array) => array.reduce((a, b) => a.concat(b), []),//flatten箭头函数写法
    },

    flattenDeep: function(array) {//展开数组（深层）
        var result = [];
        function flatten(array) {
            for (var i = 0; i < array.length; i++) {
                if (Array.isArray(array[i])) {
                    flatten(array[i]);
                } else {
                    result.push(array[i]);
                }
            }
            return result;
        }
        return flatten(array);
    },

    fromPairs: function(array) {//将数组成对放入对象
        var result = {};
        for (var i = 0; i < array.length; i++) {
            result[array[i][0]] = array[i][1];
        }
        return result;
        // fromPairs: (pairs) => pairs.reduce((a, b) => (a[b[0]] = b[1], a), {}),//fromPairs箭头函数写法
    },

    flip: function(func) {
        return function(...args) {
            return func(...args.reverse());//用了数组的reverse方法，再展开
        }
    },

    spread: function(func) {//展开
        return function(ary) {
            return func.apply(null, ary);
        }
    },

    once: function(func) {//只运行一次
        var called = false;
        var firstinvokeresult;
        return function(...args) {
            if (!called) {
                called = true;
                return firstinvokeresult = func(...args);
            } else {
                return firstinvokeresult;
            }
        }
    },

    negate: function(predicate) {//取相反函数
        return function(...args) {
            return !predicate(...args);
        }
    },

    unary: function(func) {//只能接受一个参数
        return function(arg) {
            return func(arg);
        }
    },

    ary: function(func, n = func.length) {//只传入前n个参数
        return function(...args) {
            if (n < args.length) {
                args.length = n;
            }
            return func(...args);
        }
    },

    property: function(path) {//返回给定对象在特定路径下的值
        return function(obj) {
            return get(obj, path);
        }
    },

    get: function(obj, path) {//{a:{b:{c:3}}} , ["a","b","c"]
        for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]];
            if (obj === undefined || obj === null) {
                return undefined;
            }
        }
        return obj;
    },
    /**
     * get: function(obj, path) {//递归写法
        //get({a:{b:{c:3}}} , ["a","b","c"])
        //get({a:{b:{c:3}}}["a"] , [b","c"])
        if (path.length === 0 || obj === undefined || obj === null) {
            return obj
        }
        return get(obj[path[0]], path.slice(1))
    }
     */
    /**
     * get: function(obj, path) {//reduce写法
        return path.reduce((obj, prop) => {
            return obj[prop];
        }, obj)
    }
     */
    head: function(array) {//返回数组第一项
        if (array.length === 0) {
            return undefined;
        }
        return array[0];
    },

    indexOf: function(array, value, fromIndex = 0) {//按照value查找下标
        if (fromIndex >= array.length) {
            return -1;
        }
        if (fromIndex < 0) {
            fromIndex += array.length;
        }
        for (var i = fromIndex; i < array.length; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    },

    initial: function(array) {//去除最后一项
        return array.slice(0,array.length - 1);
        // initial: (array) => array.slice(0, -1),//initial箭头函数写法
    },

    intersection: function(array1, array2) {//交差点
        var result = [];
        for (var item of array1) {
            if (array2.includes(item)) {
                result.push(item);
            }
        }
        return result;
    },

    intersectionWith: function(...arg) {
        var comparator = arg.pop();
        return arg[0].filter(it => arg[1].some(comparator.bind(null,it)));
    },

    join: function(array, separator = ",") {//数组每个元素之间插入符号
        return array.join(separator);
    },

    last: function(array) {//数组最后一项
        return array[array.length - 1];
    },

    lastIndexOf: function(array, value, fromIndex = array.length - 1) {//从后往前找
        if (Math.abs(fromIndex) > array.length) {
            return -1;
        }
        if (fromIndex < 0) {
            fromIndex = array.length - Math.abs(fromIndex);
        }
        for (var i = fromIndex; i >= 0; i--) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    },

    pull: function(array,...values) {//取出值为value的项
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < array.length; j++) {
                if (array[j] === values[i]) {
                    array.splice(j, 1);
                }
            }
        }
        return array;
    },
    pullAt: function(array, indexes) {
        var result = [];
        for(var i = 0; i < indexes.length; i++) {
          result.push(array[indexes[i]]);
        }
        var sortArr = indexes.sort((a, b) => b - a);
        for(var j = 0; j < sortArr.length; j++) {
          array.splice(sortArr[j], 1);
        }
        return result;
      },

    reverse: function(array) {//倒转数组
        var result = [];
        for (var i = 0; i < array.length; i++) {
            result[array.length - i - 1] = array[i];
        }
        return result;
    },

    matches: function(source) {//查找一个属性是否在...（partial deep comparison）
        return function(obj) {
            for (var prop in source) {
                if (!isEqual(source[prop], obj[prop])) {
                    return false;
                }
            }
            return true;
        }
    },
    /**
     * matches: function(source) {//另一种写法
     * return _.bind(isMatch, null, _, source)
     * }
     */
    isMatch: function(object, source) {
        return Object.keys(source).every(a => this.isEqual(object[a], source[a]));
    },

    nth: function(array, n = 0) {//返回第n项的值
        if (n > 0) {
            return array[n];
        }
        if (n < 0) {
            return array[array.length - Math.abs(n)];
        }
        // nth: (array, n) => n < 0 ? array[array.length + n] : array[n],//nth箭头函数写法
    },

    union: function(...arrays) {//取出复数数组的值，放进数组，保证每个值只有一个
        var ary = arrays.reduce((a, b) => {
            return a.concat(b)
        });
        var result = [];
        for (var i = 0; i < ary.length; i++) {
            if (!result.includes(ary[i])) {
                result.push(ary[i]);
            }
        }
        return result;
        // union: (...arrays) => [...new Set([].concat(...arrays))],//union箭头函数写法
    },

    zip: function(array) {//2 * 3 => 3 * 2
        var result = [];
        for (var i = 0; i < array[0].length; i++) {
            result[i] = [];
        }
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                result[j][i] = array[i][j];
            }
        }
        return result;
    },

    forEach: function(collection, iteratee) {//foreach
        for (var index in collection) {
            iteratee(collection[index], index, collection);
        }
        return collection;
    },

    flattenDepth: function(array, depth = 1) {//按depth展开数组
        var flatten = function(ary) {
            return [].concat(...ary);
        }
        for (var i = 0; i < depth; i++) {
            array = flatten(array);
        }
        return array;
    },

    each: function(collection, something){
      for(key in collection) {
        if(false === something(collection[key], key, collection)){
          break;
        }
      }
    },

    pullAll: function(array, values) {//同pull
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < array.length; j++) {
                if (array[j] === values[i]) {
                    array.splice(j, 1);
                }
            }
        }
        return array;
    },

    tail: function(array) {//去除第一项得到新数组
        return array.slice(1);
    },

    take: function(array, n = 1) {//从开头取出n项，取出的部分作为新数组
        return array.slice(0, n);
    },

    takeRight: function(array, n = 1) {//从末尾取出n项，取出的部分最为新数组
        if (n >= array.length) {
            return array;
        }
        return array.slice(array.length - n);
    },

    reject: function(collection, predicate) {
        var f = liuyiliuyi.judge(predicate);
        return collection.reduce((x, y) => f(y) == true ? x : x.concat(y), [])
    },

    uniq: function(array) {//重复值保留一个
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (!result.includes(array[i])) {
                result.push(array[i]);
            }
        }
        return result;
    },

    uniq: array => [...new Set(array)],//uniq箭头函数写法

    uniqBy: function(array, iteratee) {//同uniq，增加一个迭代器
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (!result.includes(iteratee(array[i]))) {
                result.push(array[i]);
            }
        }
        return result;
    },

    uniqWith: function(array, comparator) {
        var result = [];
        array.forEach(x => {
            for(var i = 0; i < result.length; i++) {
                if(comparator(result[i], x)) {
                    return;
                }
            }
            result.push(x);
        })
        return result;
    },

    unzip: function(array) {//3 * 2 => 2 * 3
        var result = [];
        for (var i = 0; i < array[0].length; i++) {
            result[i] = [];
        }
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                result[j][i] = array[i][j];
            }
        }
        return result;
    },

    zipObject: function(props, values) {
        var obj = {}
        for(let i = 0; i < props.length; i++) {
            obj[props[i]] = values[i];
        }
        return obj;
    },

    xor: function(...arrays) {//取出两个数组的不同项
        var result = arrays.reduce((a, b) => a.concat(b));
        return result.filter((item, index) => result.indexOf(item) === result.lastIndexOf(item));
    },

    sortedIndex: function(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (value > array[i]) {
                return i + 1;
            }
        }
    },
    sortedIndexOf: function(array, value) {
        return array.indexOf(value);
    },

    sortedLastIndex: function(array, value) {
        if(array.length == 1) {
            return 1;
        }
        for(i = 0; i < array.length; i++) {
            if(array[1] > array[0] && value < array[0]) {
            return 0
            } 
            else if(array[1] > array[0] && value >= array[array.length - 1]) {
            return array.length;
            }
            else if(array[1] > array[0] && array[i] <= value && value < array[i + 1]) {
            return i + 1;
            }
            else if(array[0] > array[1] && value > array[0]) {
            return 0;
            } 
            else if(array[0] > array[1] && value <= array[array.length - 1]) {
            return array.length;
            }
            else if(array[0] > array[1] && array[i] >= value && value > array[i + 1]) {
            return i + 1;
            }
        } 
    },

    sortedLastIndexOf: function(array,value) {
        return array.lastIndexOf(value);
    },

    sortedUniq: function(array) {
        return array.reduce((a, b) => a.indexOf(b) == -1 ? a.concat(b) : a, [])
    },

    sortedUniqBy: function(array, iteratee) {
        var new_arr = [];
        return array.filter(a => {
            if(new_arr.indexOf(iteratee(a)) == -1) {
                new_arr.push(iteratee(a));
                return true;
            } else {
                return false;
            }
        })
    },

    reduce: function(collection, iteratee=_.identity, accumulator = 0) {
        var result = accumulator;
        for (var index in collection) {
            result = iteratee(result, collection[index], index);
        }
        return result;
    },

    reduceRight: function(collection, iteratee=_.identity, accumulator) {
        var result = accumulator;
        var len = collection.length - 1;
        for (var i = len; i >= 0; i--) {
            result = iteratee(result, collection[i], i);
        }
        return result;
    },

    size: function(collection) {
        if (typeof (collection) === "object") {
            var count = 0;
            for (var val in collection) {
                count++
            }
            return count;
        } else {
            return collection.length;
        }
    },

    cloneDeep: function(value) {
        var result;
        if(typeof value !== "object" || value === null) return value;
        else if (Array.isArray(value)) result = [];
        else if (typeof value === "object") result = {};
        for(var key in value) {
            result[key] = cloneDeep(value[key])
        } 
        return result;
    },

    eq: function(value, other) {
        if(value != value && other != other) return true;
        return value === other;
    },

    gt: function(value, other) {//大于
        return value > other;
    },

    gte: function(value, other) {//大于等于
        return value >= other;
    },

    every: function(collection, predicate=_.identity) {
        for (var i = 0; i < this.length; i++) {
            if (!predicate.call(this[i], i, this)) {
                return false;
            }
        }
        return true;
    },

    some: function(collection, predicate=_.identity) {
        for (var i = 0; i < this.length; i++) {
            if (predicate.call(this[i], i, this)) {
                return true;
            }
        }
        return false;
    },

    sample: function(collection) {
        let arr = [];
        for(key in collection) {
            arr.push(collection[key]);
        }
        let length = arr.length;
        return arr[Math.random() * length | 0];
    },

    isArray: function(value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    },

    isBoolean: function(value) {
        return Object.prototype.toString.call(value) === "[object Boolean]";
    },

    isBuffer: function(value) {
        return Object.prototype.toString.call(value) == "[object Buffer]";
    },

    isDate: function(value) {
        return Object.prototype.toString.call(value) == "[object Date]"
    },

    isElement: function(value) {
        return Object.prototype.toString.call(value) == "[object HTMLBodyElement]"
    },

    isError: function(value) {
        return Object.prototype.toString.call(value) == "[object Error]";
    },

    isFinite: function(value) {
        return Math.abs(value) < Infinity && typeof value == "number";
    },

    isFunction: function isFunction(value) {
        return Object.prototype.toString.call(value) == "[object Function]";
    },

    isInteger: function isInteger(value) {
        return typeof value == "number" && Math.floor(value) === value && isFinite(value);
    },

    isLength: function(value) {
        return this.isInteger(value) && value >= 0;
    },
    
    isNaN: function(value) {
        return (typeof value === "number" || value instanceof Number) && value.toString() === "NaN";
    },

    isNative: function(value) {
        return !!~value.toString().indexOf(" [native code] ");
    },

    isNil: function(value) {
        return value == undefined;
    },
        
    isNull: function(value) {
        return value === null;
    },

    isNumber: function(value) {
        return this.kindOf(value) == "[object Number]";
    },

    isObject: function(value) {
        return (typeof value == "object" || typeof value == "function") && value != null;
    },

    isObjectLike: function(value) {
        return typeof value == "object" && value != null;
    },

    isPlainObject: function(value) {
        return value.constructor == Object || value.__proto__ == null;
    },

    isRegExp: function(value) {
        return this.kindOf(value) == "[object RegExp]";
    },

    isSet: function isSet(value) {
        return this.kindOf(value) == "[object Set]";
    },

    isString: function(value) {
        return this.kindOf(value) == "[object String]";
    },

    isSymbol: function isSymbol(value) {
        return this.kindOf(value) == "[object Symbol]";
    },

    isTypedArray: function isTypedArray(value) {
        return this.kindOf(value) === "[object Uint8Array]";
    },

    isUndefined: function(value) {
        return value === undefined;
    },

    isWeakMap: function(value) {
        return this.kindOf(value) == "[object WeakMap]";
    },

    isWeakSet: function(value) {
        return this.kindOf(value) == "[object WeakSet]";
    },

    lt: function lt(value, other) {
        return value < other;
    },

    lte: function(value, other) {
        return value <= other;
    },

    toArray: function(value) {
        var arr = [];
        for(key in value) {
            arr.push(value[key])
        }
        return arr;
    },

    toNumber: function(value) {
        return Number(value);
    },

    toPlainObject: function toPlainObject(value) {
        var obj = {};
        for(var key in value) {
            obj[key] = value[key];
        }
        return obj;
    },

    add: function(x, y) {
        return x + y;
    },

    ceil: function(number, pos = 0) {
        Math.ceil(number * Math.pow(10, pos)) / Math.pow(10,pos);
    },

    divide: function(dividend, divisor) {
        dividend / divisor;
    },

    floor: function(number, pos = 0) {
        Math.floor(number * Math.pow(10, pos)) / Math.pow(10,pos);
    },

    max: function(array) {
        array.length == 0? undefined : Math.max.apply(null, array);
    },

    mean: function mean(array) {
        return array.reduce((a, b) => a + b) / array.length;
    },

    min: function(array) {
        return array.length === 0 ? undefined : Math.min(...array);
    },

    multiply: function(x, y) {
        return x * y;
    },

    round: function(number, pos = 0) {
        Math.round(number * 10 ** pos) / 10 ** pos;
    },
    
    subtract: function(minuend, subtrahend) {
        minuend - subtrahend;
    },

    sum: function sum(array) {
        return array.reduce((a, b) => a + b);
    },

    clamp: function(number, lower, upper) {
        result_arr = Array.from(arguments).sort((a, b) => a - b) ;
        return result_arr[1];
    },

    inRange: function(number, start, end){
        if(arguments.length == 2) {
            end = arguments[1] 
            start = 0;
        }
        if((number > start && number < end) || (number > end && number < start)){
            return true;
        } else {
            return false;
        }
    },

    assign: function(object, ...source){
        return source.reduce((a, b) => {
            for(key in b) {
                if(b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a  
        }, object)
    },

    assignIn: function(object, ...source){
        return source.reduce((a, b) => {
            for(key in b) {
                a[key] = b[key];
            }
            return a  
        }, object)
    },

    toPairs: function(object) {
        var arr = [];
        for(key in object) {
            if(object.hasOwnProperty(key)) {
                arr.push([key, object[key]]);
            }
        }
        return arr;
    },

    functions: function(object) {
        var arr = [];
        for(key in object) {
            if(object.hasOwnProperty(key) && typeof object[key] == "function") {
                arr.push(key);
            }
        }
        return arr;
    },

    invert: function(object) {
        var arr = [];
        for(var key in object) {
            arr.push([object[key], key]);
        }
        return arr.reduce((a, b) => {
            a[b[0]] = b[1];
            return a;
        }, {})
    },

    result: function(object, path, defaultvalue) {
        var value = this.get(object, path, defaultvalue);
        return this.isFunction(value) ? value.bind(this)() : value;
    },

    values: function(object) {
        var arr = [];
        for(key in object) {
            if(object.hasOwnProperty(key)) {
                arr.push(object[key]);
            }
        }
        return arr;
    },

    valuesIn: function(object) {
        var arr = [];
        for(key in object) {
            arr.push(object[key]);
        }
        return arr;
    },

    camelCase: function(str) {
        return str.match(/[a-zA-Z0-9]+/g).reduce((a, b, i) => i == 0 ? a + b.toLowerCase() : a + b.slice(0, 1).toUpperCase() + b.slice(1).toLowerCase(), "")
    },

    capitalize: function(str) {
        return str.replace(/^(\w)(.*)/g, (m, a, b) => a.toUpperCase() + b.toLowerCase())
    },

    deburr: function(str) {
        var convert = {
                    "c0": "A",
                    "c1": "A",
                    "c2": "A",
                    "c3": "A",
                    "c4": "A",
                    "c5": "A",
                    "e0": "a",
                    "e1": "a",
                    "e2": "a",
                    "e3": "a",
                    "e4": "a",
                    "e5": "a",
                    "c7": "C",
                    "e7": "c",
                    "d0": "D",
                    "f0": "d",
                    "c8": "E",
                    "c9": "E",
                    "ca": "E",
                    "cb": "E",
                    "e8": "e",
                    "e9": "e",
                    "ea": "e",
                    "eb": "e",
                    "cc": "I",
                    "cd": "I",
                    "ce": "I",
                    "cf": "I",
                    "ec": "i",
                    "ed": "i",
                    "ee": "i",
                    "ef": "i",
                    "d1": "N",
                    "f1": "n",
                    "d2": "O",
                    "d3": "O",
                    "d4": "O",
                    "d5": "O",
                    "d6": "O",
                    "d8": "O",
                    "f2": "o",
                    "f3": "o",
                    "f4": "o",
                    "f5": "o",
                    "f6": "o",
                    "f8": "o",
                    "d9": "U",
                    "da": "U",
                    "db": "U",
                    "dc": "U",
                    "f9": "u",
                    "fa": "u",
                    "fb": "u",
                    "fc": "u",
                    "dd": "Y",
                    "fd": "y",
                    "ff": "y",
                    "c6": "Ae",
                    "e6": "ae",
                    "de": "Th",
                    "fe": "th",
                    "df": "ss"
                }
        var arr = str.split('');
        var result = arr.map(function(x) {
                if(convert[x.charCodeAt().toString(16)]) {
                    return convert[x.charCodeAt().toString(16)];
                } else {
                    return x;
                }
            })
        return result.join("");
    },

    endsWith: function(str, char, position) {
        if (!position) {
            position = str.length;
        }
        return str[position - 1] == char ? true : false;
    },

    escape: function(str){
        var re = /[&<>"']/g;
        var symbol = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&apos;",
        };
        return str.replace(re, function(x) {return symbol[x]});
    },

    escapeRegExp: function(str){
        var re = /[\^\$\.\*\+\?\(\)\[\]\{\}\|]/g;
        // var symbol = {
        //   "^": "\\^",
        //   "$": "\\$",
        //   ".": "\\.",
        //   "*": "\\*",
        //   "+": "\\+",
        //   "?": "\\?",
        //   "(": "\\(",
        //   ")": "\\)",
        //   "[": "\\[",
        //   "]": "\\]",
        //   "{": "\\{",
        //   "}": "\\}",
        //   "|": "\\|",
        // };
        return str.replace(re, function(x) {return "\\" + x});
    },

    lowerCase: function(str) {
        var words_arr = getWords(str);
        words_str = words_arr.join(" ");
        re = /[a-z][A-Z]/g;
        return words_str.replace(re, m => (m.slice(0,1) + " " + m.slice(1))).toLowerCase();
    },

    lowerFirst: function(str) {
        var str_upper = str;
        return str_upper[0].toLowerCase() + str_upper.slice(1);
    },

    pad: function(input_str, input_num, input_symbol) {
        //if(!input_symbol) {input_symbol = " ";}
        if(arguments[2] == undefined) {input_symbol = " ";}
        var symbol_length = input_num - input_str.length;
        var all_symbol = generatorSymbol(symbol_length, input_symbol);
        var symbol_left_length = Math.floor((input_num - input_str.length) / 2);
        //var symbol_right_length = Math.ceil((input_num - input_str.length) / 2); 
        var symbol_left = all_symbol.slice(0, symbol_left_length);
        var symbol_right = all_symbol.slice(symbol_left_length);
        return symbol_left + input_str + symbol_right;
    },

    parseInt: function(str) {
        return Number(+str).toString();
    },

    repeat: function(str, times) {
        var result = "";
        var str2 = str;
        for(i = 0; i < times; i++) {
            result = result + str;
        }
        return result;
    },

    split: function(str, symbol, length) {
        return str.split(symbol).slice(0, length);
    },

    startCase: function(str) {
        return str.replace(/([a-z])(?=[A-Z])/g, "$1 ").replace(/[_ -]+/g, " ").replace(/\b\w/g, a =>a.toUpperCase()).trim();
    },

    startsWith: function(str, target, position) {
        return str.indexOf(target, position) == (position == undefined ? 0 : position) ? true: false;
    },

    toLower: function(str){
        return str.toLowerCase();
    },

    toUpper: function(str){
        return str.toUpperCase();
    },
    trim: function(str, symbol = /\s/) {
        return str.replace(new RegExp(`^[${symbol}]*|[${symbol}]*$`, "g"), "");
    },


    // function remove_left_right_symbol(str) {
    //   return str.match(/([^0-9A-Za-z]*)([0-9A-Za-z].*[0-9A-Za-z])([^0-9A-Za-z]*)/); //返回[全部匹配, 捕获左边, 捕获中间，捕获右边,]
    // }

    // function remove_common_symbol(input_str, goal_symbol) {
    //   for(i = 0; i < goal_symbol.length; i++) {
    //     // while(input_str.indexOf(goal_symbol[i]) >= 0) {
    //     //   //input_str = input_str.slice(0, input_str.indexOf(goal_symbol[i])) + input_str.slice(input_str.indexOf(goal_symbol[i]));
    //     //   input.str.s
    //     // }
    //     if (input_str.indexOf(goal_symbol[i]) >= 0) {
    //     var regexp = new RegExp(goal_symbol[i], "g");
    //     input_str = input_str.replace(regexp, "");
    //     }
    //   }
    //   return input_str;
    // }



    // function trim(str, char) {
    
    // }

    /**
     * 去除字符串前后给定的符号
     * @str {字符串} {str} [输入的字符串]
     * @symbol {字符串} [symbol] [要删除的符号]
     //  *[description]
    */
    /*
    function trim(str, symbol) {
    var input_symbol = symbol + symbol + symbol+ symbol;  
    var input_str_arr = str.split("");
    for(var i = 0; i < input_symbol.length; i++) {
        while(input_str_arr[0] == input_symbol[i]) {
        input_str_arr.shift();
        }
        while(input_str_arr[input_str_arr.length - 1] == input_symbol[i]) {
        input_str_arr.pop();
        }
    }
    console.log(input_str_arr)
    }
    */

    // function trim(str, symbol) {
    //   symbol = symbol ? symbol : "  　";
    //   var input_symbol = symbol;
    //   var input_str_arr = str.split("");
    //   while(input_symbol.indexOf(input_str_arr[0]) != -1){
    //     input_str_arr.shift();
    //   }
    //   while(input_symbol.indexOf(input_str_arr[input_str_arr.length - 1]) != -1){
    //     input_str_arr.pop();
    //   }
    //   return input_str_arr.join("");  
    // }

    trimEnd: function(str, symbol = /\s/) {
        return str.replace(new RegExp(`[${symbol}]*$`, "g"), "");
    },
    trimStart: function(str, symbol = /\s/) {
        return str.replace(new RegExp(`^[${symbol}]*`, "g"), "");
    },

    unescape: function(str) {
        var entities = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"',
            "&apos;": "'",
        }
        var input_str = str;
        var re = /&amp;|&lt;|&gt;|&quot;|&apos;/g
        return input_str.replace(re, x => entities[x]);
    },

    upperCase: function(str) {
        var words_arr = getWords(str);
        re = /[A-Z]/g;
        output = words_arr.join(" ").replace(re,m=> " " + m).toUpperCase();
        return output;
    },

    upperFirst: function(str) {   //把第一个字母大写
        var input_str = str;
        return input_str.slice(0, 1).toUpperCase() + input_str.slice(1);
    },
    words: function(str, pattern = /\w+/g) {
      return str.match(pattern);
    },

    bindAll: function(object, methodNames) {
        methodNames = Array.isArray(methodNames) ? methodNames : [methodNames];
        methodNames.forEach((x) => object[x] = object[x].bind(object));
        return object;
    },

    conform: function(source) {
        return function(arg) {
            return Object.keys(source).every((value) => source[value](arg[value]));
        }
    },

    constant: function(value) {
        return function() {
            return value;
        }
    },

    defaultTo: function(value, defaultValue) {
        return this.isNaN(value) || value === null || value === undefined ? defaultValue : value;
    },

    flow: function(func) {
        var that = this;
        return function(...args) {
            return func.reduce((x, y, i) => {if(i === 0) return y(...args); else return y(x)}, args);
        }
    },

    flowRight: func => (...args) => func.reduceRight((x, y, i) => i === 0 ? y(...x) : y(x), args),

    method: function(path, args) {
        return function (obj) {
            return args ? this.toPath(path).reduce((x, y) => x[y], obj)() : this.toPath(path).reduce((x, y) => x[y], obj)(...args);
        }
    },

    methodOf: function(object, args) {
        var self = this;
        return function (path) {
            return args ? self.toPath(path).reduce((x, y) => x[y], object)(...args) : self.toPath(path).reduce((x, y) => x[y], object)();
        }
    },

    mixin: function(object = liuyiliuyi, source, option = {}) {   /*object.__proto__.x = source([x])   object = source([x])*/
        var that = this;
        arguments.length === 1 && (source = object, object = liuyiliuyi);
        Object.keys(source).forEach((x) => that.isFunction(source[x]) && (that.isFunction(object) ? object.__proto__.x = source[x] : object = source[x]));
        return object;
    },

    nthArg: function(n = 0) {
        return function(...arg) {
            return arg[(n + length) % length ]
        }
    },

    property: function(path) {
        path = this.toPath(path);
        return function(obj) {
            return path.reduce((x, y) => x[y], obj);
        //   var result = obj;
        //   for(var i = 0; i < arr.length; i++) {
        //     result = result[arr[i]];
        //   }
        //   return result;
        // }
        }
    },

    propertyOf: function(object) {                
        var self = this;
        return function(arg) {
            return self.toPath(arg).reduce((x, y) => x[y], object);
        }
    },

    range: function(start = 0, end, step = 1) {
        var result = [];
        if(arguments.length === 1 && arguments[0] <= 0) {
            end = start, start = 0, step = -1;
        }
        else if(arguments.length === 1) {
            end = start, start = 0;
        }
        for(var i = start; Math.abs(i) < Math.abs(end) && result.length < Math.abs(end - start); i += step) {
            result.push(i);
        }
        return result;
    },

    times: function(n, iteratee) {
        var result = [];
        for(var i = 0; i < n; i++){
            result.push(iteratee(i));
        }
        return result;
    },

    toPath: function(value) {
        try{
            return value.match(/[^\[\]\.]/g);
        } catch (e) {
            return value;
        }
    },

    uniqueId: function(prefix = "") {
        amount ? amount++ : amount = 1;
        return prefix + amount;
    },


}