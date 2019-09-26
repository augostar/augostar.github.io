---

title: 爬虫 fake_useragent 随机请求头
date: 2019-9-20 
tags: python
category: python

---


1、安装

在cmd命令行中进行安装，pip install fake_useragent
from fake_useragent import UserAgent
for i in range(5):
    print(UserAgent().random)

<!-- more -->