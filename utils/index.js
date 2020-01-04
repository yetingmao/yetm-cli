/*
 * @Description: 通用工具方法
 * @Autor: yetm
 * @Date: 2019-12-11 17:21:31
 * @LastEditors  : yetm
 * @LastEditTime : 2020-01-04 18:48:12
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
function update(packageJson, key, defaultValue, value) {
    let tempJson = { ...packageJson };
    if (typeof tempJson[key] === "string") {
        if (defaultValue !== value) {
            tempJson[key] = value;
        }
    } else {
        tempJson = { [key]: value, ...packageJson };
    }
    return tempJson;
}
function change(packageString, opt, DEFAULT) {
    let packageJson = JSON.parse(packageString);
    const { name, version, description, author } = DEFAULT;
    packageJson = update(packageJson, "author", author, opt.author);
    packageJson = update(packageJson, "description", description, opt.description);
    packageJson = update(packageJson, "version", version, opt.version);
    packageJson = update(packageJson, "name", name, opt.name);
    return JSON.stringify(packageJson);
}
module.exports = {
    clone, change
}