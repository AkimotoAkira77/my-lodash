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
    isMatch: function(obj, source) {//同上
        for (var prop in source) {
            if (!isEqual(source[prop], obj[prop])) {
                return false;
            }
        }
        return true;
    },

    nth: function(array, n = 0) {//返回第n项的值
        if (n > 0) {
            return array[n];
        }
        if (n < 0) {
            return array[array.length - Math.abs(n)];
        }
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

    uniq: function(array) {//重复值保留一个
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (!result.includes(array[i])) {
                result.push(array[i]);
            }
        }
        return result;
    },

    uniqBy: function(array, iteratee) {//同uniq，增加一个迭代器
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (!result.includes(iteratee(array[i]))) {
                result.push(array[i]);
            }
        }
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

    isArray: function(value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    },

    isBoolean: function(value) {
        return Object.prototype.toString.call(value) === "[object Boolean]";
    },

    
}