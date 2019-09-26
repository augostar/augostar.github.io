---

title: CSS样式
date: 2019-6-20
tags: web前段框架
categories: css

---

### 设置显示行数 2行 溢出隐藏加省略号  

溢出隐藏
overflow: hidden;
显示省略号来代替被修剪的文本
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;（行数）
-webkit-box-orient: vertical;

<!-- more -->

- ### 设置日期居右显示

```	 css
	ul li{
		positio:relative
	}
	ul li span{
		position:absolute;
		right:0
	}
```

背景关联 文档比较长 文档向下滚动式 背景图像也会随之滚动 
当文档滚动到超过图像的位置时 图像就会消失 
可通过background-attachment属性防止这种滚动 可以声明图像对于可视区是固定的fixed 
因此不会受到滚动的影响了
background-image:url(/i/eg_bg_02.gif);
background-repeat:no-repeat;
background-attachment:fixed

超链接 a标签
a:link 初始状态
a:hover 鼠标移上
a:active 鼠标点击时
a:visited 访问过后

垂直居中
display: inline-block;

### css常用字体

宋体	SimSun

黑体	SimHei

微软雅黑	Microsoft?YaHei

微软正黑体	Microsoft?JhengHei

新宋体	NSimSun

新细明体	PMingLiU

细明体	MingLiU

标楷体	DFKai-SB

仿宋	FangSong

楷体	KaiTi

仿宋_GB2312	FangSong_GB2312

楷体_GB2312	KaiTi_GB2312
