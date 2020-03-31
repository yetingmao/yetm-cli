/*
 * @Description: 通用工具方法
 * @Autor: yetm
 * @Date: 2019-12-11 17:21:31
 * @LastEditors: yetm
 * @LastEditTime: 2020-03-31 15:05:59
 */
const download = require("download-git-repo");

function clone(frame, projectName, fc) {
    let repository;
    switch (frame) {
        case "react-antd-desgin":
            repository = "umi_dva"
            break;
        case "vue-view-design":
            repository = "vue_iview_vuex"
            break;
        default:
            break;
    }
    if (!repository) {
        fc("没有查找到相关项目");
    }
    download(`direct:https://github.com/yetingmao/${repository}`, projectName, { clone: true }, (err) => {
        fc(err);
    });
}
function change(packageString, opt, DEFAULT) {
    const packageJson = Object.assign({}, DEFAULT, opt, JSON.parse(packageString));
    return JSON.stringify(packageJson);
}
module.exports = {
    clone, change
}