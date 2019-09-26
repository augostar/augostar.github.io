---

title: python入门
date: 2019-9-1 
tags: python 
category: python
top: true

---

### 1、安装python
		
官网 https://www.python.org/
		
地址：https://www.python.org/ftp/python/3.8.0/python-3.8.0b2-amd64.exe
		
python -V
		
查看python 版本
	
<!-- more -->

### 2、配置环境变量（path）
	
### 3、 安装pip
		
pip 是 Python 包管理工具，该工具提供了对Python 包的查找、下载、安装、卸载的功能。
		
pip 官网：https://pypi.org/project/pip/
			
pip 下载地址：https://files.pythonhosted.org/packages/8b/8a/1b2aadd922db1afe6bc107b03de41d6d37a28a5923383e60695fba24ae81/pip-19.2.1.tar.gz
 			
git 地址 ：https://files.pythonhosted.org/packages/8b/8a/1b2aadd922db1afe6bc107b03de41d6d37a28a5923383e60695fba24ae81/pip-19.2.1.tar.gz
			
更新pip pip install --upgrade pip或者 python-m pip install--upgrade pip  报错选择：python -m pip install --upgrade pip
		
os模块在python中属于内置模块，即不需要额外安装 os模块提供了非常丰富的方法来处理文件和目录
		
测试 os模块

``` python
	import os
	
	cmd = 'ipconfig'

	retval = os.system(cmd)
	
	print (retval)
	
```
requests的底层实现就是urllib 

requests在python2 和python3中通用，方法完全一样

requests能够自动帮助我们解压(gzip压缩的等)网页内容
		
安装requests模块: pip install requests

		
测试 requests
		
```
import requests

headers = {
    # 设置用户代理头(为狼披上羊皮)
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
}

baidu = requests.get("http://www.baidu.com/", headers=headers).status_code

print (baidu)		

#输出结果200  
		
```		

1、Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: module 'requests' has no attribute 'get'

错误原因 文件名称 与导入模块同名了


pip list 列出所有安装的python已经安装的模块

安装 lxml lxml是个非常有用的python库，它可以灵活高效地解析xml，与BeautifulSoup、requests结合，是编写爬虫的标准姿势
	打开cmd，输入pip install lxml。





