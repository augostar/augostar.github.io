---

title: hexo创建个人博客
date: 2018-06-13 20:20:43
tags: hexo
category: web前段
---

### 如何使用hexo搭建自己的个人博客
### Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。
<!-- more -->
1 全局安装hexo
mkdir  <demo> 创建项目文件

2 初始化一下
hexo i
hexo s  启动
hexo n "我的 第一篇文章"
md 文档
3 部署在 github
    登陆github
    新建仓库
    必须是昵称.geihub.io
    npm install --save hexo-deployer-git
    配置 _config.yml
   type: git
        repo: 仓库地址
        branch:master
    部署命令 hexo d 
    github账号 密码
        github.com/litten/hexo-theme-yilia
        git clone https://github.com/litten/hexo-theme-yilia

        hexo clean
        生成一下
        hexo g
        hexo s
        hexo d
