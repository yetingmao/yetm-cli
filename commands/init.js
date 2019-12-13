/*
 * @Description: 命令代码
 * @Autor: yetm
 * @Date: 2019-12-11 14:34:12
 * @LastEditors: yetm
 * @LastEditTime: 2019-12-13 10:31:46
 */
const inquirer = require("inquirer");
const program = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const spinner = ora("Downloading please wait......");
const fs = require("fs");
const path = require("path");
const unils = require("../utils");
const questionList = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        default: "newProject",
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
        name: "frame",
        message: "frame",
        choices: [
            "react-antd-dva",
            "vue-viewDesign-vuex",
        ],
        default: "react-antd-dva",
        filter: function (val) {
            return val.toLowerCase();
        }
    }
]


const go = (async () => {
    const answers = await inquirer.prompt(questionList);
    spinner.start();
    const { projectName, description, author, frame } = answers;
    // 生成项目目录
    fs.mkdir(projectName, err => {
        if (err) {
            console.log("项目目录生成失败")
        }
    });
    console.log("clone======================>", unils);
    clone(frame, projectName, (err) => {
        if (err) {
            spinner.stop();
            console.log(err)
        } else {
            spinner.stop();
            console.log(chalk.red("项目初始化成功"));
        }
    });
});
go();
