<!--
 * @Description: readme
 * @Autor: yetm
 * @Date: 2019-12-11 14:28:56
 * @LastEditors  : yetm
 * @LastEditTime : 2020-01-06 19:12:09
 -->
### 项目架构

##### node.js
##### <a href="https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md">commander.js</a> (命令行参数处理模块)
##### chalk （输出字体颜色模块）
##### download-git-repo  (下载并提取 git 仓库，用于下载项目模板)
##### <a href="https://github.com/SBoudrias/Inquirer.js">Inquirer.js</a> (通用的命令行用户界面集合，用于和用户进行交互。)
##### ora (下载过程久的话，可以用于显示下载中的动画效果)
---
###  项目结构
```
├─── bin  //项目入口文件 
├── commands    //项目命令文件
├── node_modules    //包 
├── .editorconfig   //编辑格式
└── package.json    //项目说明
└── readme.md   //此文件
└── yarn.lock   //lock
```
---
###  项目使用
```
npm install -g yetm-cli

yetmcli -V 
        -h
yetmcli init | i 创建项目
```
### 支持
#### node版本>=10