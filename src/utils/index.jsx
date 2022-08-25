export const isFalsy = (value) => value === 0? false: !value

// 在一个函数中改变传入的对象是不好的!
export const cleanObject = (object) => {
    const result = {...object};
    Object.keys(result).forEach(key => {
        const value = result[key];
        // 排除value为0的情况
        if (isFalsy(value)) {
            delete result[key];
        }
    })
    return result;
}