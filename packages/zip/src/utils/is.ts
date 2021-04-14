const is = {
  arr(a: unknown): a is Array<any> {
    return Array.isArray(a);
  },
  obj(a: unknown): a is Object {
    return typeof a === 'object';
  },
  str(a: unknown): a is string {
    return typeof a === 'string';
  },
  num(a: unknown): a is number {
    return typeof a === 'number' && !isNaN(a);
  },
  und(a: unknown): a is undefined {
    return typeof a === 'undefined';
  },
  nul(a: unknown): a is null {
    return a === null;
  },
  boo(a: unknown): a is boolean {
    return typeof a === 'boolean';
  },
  fun(a: unknown): a is Function {
    return a instanceof Function;
  }
};
export default is;
