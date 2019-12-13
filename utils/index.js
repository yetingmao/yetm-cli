/*
 * @Description: 通用工具方法
 * @Autor: yetm
 * @Date: 2019-12-11 17:21:31
 * @LastEditors: yetm
 * @LastEditTime: 2019-12-13 11:26:21
 */
const download = require("download-git-repo");

function clone(frame, projectName, fc) {
    download(`direct:https://github.com/yetingmao/${frame}`, projectName, { clone: true }, (err) => {
        fc(err);
    });
}
module.exports = {
    clone
}