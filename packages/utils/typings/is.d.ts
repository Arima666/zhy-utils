declare const is: {
    arr(a: unknown): a is any[];
    obj(a: unknown): a is Object;
    str(a: unknown): a is string;
    num(a: unknown): a is number;
    und(a: unknown): a is undefined;
    nul(a: unknown): a is null;
    boo(a: unknown): a is boolean;
    fun(a: unknown): a is Function;
};
export default is;
