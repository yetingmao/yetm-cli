/*
 * @Description: 命令代码
 * @Autor: yetm
 * @Date: 2019-12-11 14:34:12
 * @LastEditors: yetm
 * @LastEditTime: 2019-12-11 16:44:22
 */
const inquirer = require("inquirer");
const program = require("commander");
const chalk = require("chalk");
const download = require("download-git-repo");
const ora = require("ora");
const spinner = ora("Downloading please wait......");
const fs = require("fs");
const path = require("path");
const option = program.parse(process.argv).args[0];
const defaultName = typeof option === "string" ? option : "My-project";
const questionList = [
    {
        type: 'input',
        name: 'Project name',
        message: 'Project name',
        default: defaultName,
        filter(val) {
            return val.trim()
        },
        validate(val) {
            const validate = (val.trim().split(" ")).length === 1
            return validate || 'Project name is not allowed to have spaces ';
        },
        transformer(val) {
            return chalk.blue(val);
        }
    }, {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: 'My project',
        validate(val) {
            return true;
        },
        transformer(val) {
            return chalk.blue(val);
        }
    }, {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: 'project author',
        validate(val) {
            return true;
        },
        transformer(val) {
            return chalk.blue(val);
        }
    }, {
        type: "list",
        name: "program type",
        message: "program type",
        choices: [
            "Nodejs",
            "Typescript",
            "Python"
        ],
        default: "nodejs",
        filter: function (val) {
            return val.toLowerCase();
        }
    }
]
// 生成项目目录
fs.mkdir(defaultName, err => {
    if (err) {
        console.log("项目目录生成失败")
    }
});
(async () => {
    const answers = await inquirer.prompt(questionList);
    console.log("answers", answers);
})();

    // 根据用户选择的语言去配置对应的配置文件
    // inquirer.prompt(questionList).then(answers => {
    //     if (answers["program type"] === "nodejs") {
    //         spinner.start();
    //         download("direct:https://gitlab.com/zjiahuizjh/auto-cli#node-conf", answers["Project name"], { clone: true }, (err) => {
    //             if (err) {
    //                 spinner.stop();
    //                 console.log(err)
    //             } else {
    //                 spinner.stop();
    //                 console.log(chalk.red("项目初始化成功"));
    //             }
    //         });
    //     } else if (answers["program type"] === "typescript") {
    //         spinner.start();
    //         download("direct:https://gitlab.com/zjiahuizjh/auto-cli#ts-conf", answers["Project name"], { clone: true }, (err) => {
    //             if (err) {
    //                 spinner.stop();
    //                 console.log(err)
    //             } else {
    //                 spinner.stop();
    //                 console.log(chalk.red("项目初始化成功"));
    //             }
    //         });
    //     } else {
    //         spinner.start();
    //         download("direct:https://gitlab.com/zjiahuizjh/auto-cli#py-config", answers["Project name"], { clone: true }, (err) => {
    //             if (err) {
    //                 spinner.stop();
    //                 console.log(err)
    //             } else {
    //                 spinner.stop();
    //                 console.log(chalk.red("项目初始化成功"));
    //             }
    //         });
    //     }
    // });
