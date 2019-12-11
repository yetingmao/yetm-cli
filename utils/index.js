/*
 * @Description: 通用工具方法
 * @Autor: yetm
 * @Date: 2019-12-11 17:21:31
 * @LastEditors: yetm
 * @LastEditTime: 2019-12-11 17:24:00
 */
export function have(arr) {
    return arr.some((item) => {
        return ["list"].includes(item)
    });
}