/*
 * @Description: 通用工具方法
 * @Autor: yetm
 * @Date: 2019-12-11 17:21:31
 * @LastEditors: yetm
 * @LastEditTime: 2019-12-13 15:10:10
 */
const download = require("download-git-repo");

function clone(frame, projectName, fc) {
    let repository;
    switch (frame) {
        case "react-antd-dva":
            repository = "umi_dva"
            break;
        case "vue-viewdesign-vuex":
            repository = "vue_iview_vuex"
            break;
        default:
            break;
    }
    download(`direct:https://github.com/yetingmao/${repository}`, projectName, { clone: true }, (err) => {
        fc(err);
    });
}
module.exports = {
    clone
}