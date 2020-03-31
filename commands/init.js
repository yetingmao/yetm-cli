/*
 * @Description: 命令代码
 * @Autor: yetm
 * @Date: 2019-12-11 14:34:12
 * @LastEditors: yetm
 * @LastEditTime: 2020-03-31 15:22:01
 */
const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");
const spinner = ora("Downloading please wait......");
const fs = require("fs");
const fsPromises = fs.promises;
const { normalize } = require("path");
const { clone, change } = require("../utils");
const DEFAULT_PROP = {
    name: "my-project",
    version: "0.0.1",
    description: "my new project",
    author: "yetm",
};
const questionList = [
    {
        type: 'input',
        name: 'name',
        message: '项目名',
        default: DEFAULT_PROP.name,
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
        name: 'version',
        message: '版本号',
        default: DEFAULT_PROP.version,
        filter(val) {
            return val.trim()
        },
        validate(val) {
            return true;
        },
        transformer(val) {
            return chalk.blue(val);
        }
    }, {
        type: 'input',
        name: 'description',
        message: '描述',
        default: DEFAULT_PROP.description,
        validate(val) {
            return true;
        },
        transformer(val) {
            return chalk.blue(val);
        }
    }, {
        type: 'input',
        name: 'author',
        message: '作者',
        default: DEFAULT_PROP.author,
        validate(val) {
            return true;
        },
        transformer(val) {
            return chalk.blue(val);
        }
    }, {
        type: "list",
        name: "frame",
        message: "前端框架",
        choices: [
            // "react-antd-dva",
            // "vue-viewDesign-vuex",
            "react",
            "vue",
        ],
        default: "react",
        filter: function (val) {
            return val.toLowerCase();
        }
    }
]
const frameList = {
    vue: [{
        type: "list",
        name: "ui",
        message: "UI框架",
        choices: [
            //   "element",
            "view-design",
        ],
        default: "view-design",
        filter: function (val) {
            return val.toLowerCase();
        }
    }],
    react: [{
        type: "list",
        name: "ui",
        message: "UI框架",
        choices: [
            "antd-desgin",
        ],
        default: "antd-desgin",
        filter: function (val) {
            return val.toLowerCase();
        }
    }]
}

const go = (async () => {
    let errInfo = "";
    try {
        const answers = await inquirer.prompt(questionList);
        const { name, frame } = answers;
        const { ui } = await inquirer.prompt(frameList[frame]);
        const frameName = `${frame}-${ui}`;
        spinner.start();
        // 生成项目目录
        await fsPromises.mkdir(name, {});
        clone(frameName, name, async (err) => {
            if (err) {
                spinner.stop();
                console.log("cloneerr==>", err);
                throw errInfo;
            } else {
                spinner.stop();
                //修改package文件
                const packageJsonUrl = normalize(`${process.cwd()}/${name}/package.json`);
                const packageString = await fsPromises.readFile(packageJsonUrl);
                const updatedPackageString = change(packageString, answers, DEFAULT_PROP);
                await fsPromises.writeFile(packageJsonUrl, updatedPackageString);
                console.log(chalk.blue("项目初始化成功"));
            }
        });
    } catch (error) {
        throw error;
    }
});
go();
