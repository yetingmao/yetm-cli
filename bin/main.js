#! /usr/bin/env node
/*
 * @Description: 入口文件
 * @Autor: yetm
 * @Date: 2019-12-11 14:32:12
 * @LastEditors: yetm
 * @LastEditTime: 2019-12-11 17:29:50
 */
process.env.NODE_PATH = __dirname + "/../node_modules";
const { resolve } = require("path");
const res = command => resolve(__dirname, "../commands/", command);
const program = require("commander");
const package = require("../package.json");

program
    .version(package.version);

program
    .usage("<command>"); //自定义在帮助信息第一行中显示的命令使用描述(description)


program
    .command("init")
    .description("create a project")
    .alias("i")
    .action(() => {
        require(res("init"))
    });

program.parse(process.argv);

// 判断终端上输入出来bin中的命令是否还有其他值，如果没有终端会直接输出help
if (typeof process.argv === "undefined" || process.argv.length <= 2 || !process.argv.some(item => ["init", "i"].includes(item))) {
    program.help();
}