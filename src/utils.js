export const isCommonObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]'

export const isString = (str) => Object.prototype.toString.call(str) === '[object String]'

export const isObject = (obj) => obj && typeof obj === 'object'