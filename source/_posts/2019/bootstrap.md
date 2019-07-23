---

title: bootstrap框架
date: 2019-07-23 10:00:07
tags: web前段框架
categories: UI框架
top: true

---

### 复习Bootstrap

选择Soucrce code 源码下载
Bootstrap是依赖于jquery 的
<!-- more -->
### 导航 nav

+ .nav-fill 填满
+ .nav-item 一项
+ .nav-jusified 两端对齐的
+ .nav-line 
+ .nav-pills 
+ .nav-tabs 选项卡

### 文本

+  .text-lowercase  全部小写
+  .text-uppercase  全部大写
+  .text-capitalize 首字母大写
+ 副标题 <small></small>
+ .lead 突出显示
+ mark 字体背景效果
+ 删除文本 <del></del>
+ 文本对齐 .text-left/text-right/text-center/text-justify/text-nowrap
+  缩略语 .attribute
+  首字母缩略 .initialism
+  手机号 .phone
+ <code>&lt; script &gt; </code> 代码提示
<!-- + 代码块 <pre></pre> -->
+ <var>X</var>=<var>y</var>+<var>z</var> 公式效果
+ <samp>hello world</samp>
+ <kbd></kbd>标记 输入
+ 字体添加不同的颜色 .text-danger .text-warning .text-info .text-success .text-primary .text-muted
    /危机 警告 信息 成功 初级的 弱的（淡的）

+ 背景.bg-danger .bg-warning .bg-info .bg-success .bg-primary .bg-muted
    /危机 警告 信息 成功 初级的 弱的（淡的）

### 栅格

+ 容器 containers 固定值\container-fluid 100%
+ .col-xs- <750
+ .col-sm- >750
+ .col-md- >970
+ .col-lg- >1170
+ col-md-offset-1 偏移
+ col-md-push-3 列的排序

### 表格 table

+ 条纹状 .table-striped 
+ 边框 .table-bordered 
+ 鼠标悬停 .table-hover
+ 紧凑型 .table-condensed
+ .active 悬停
+ .success 成功
+ .info  信息
+ .warning 警告
+ .danger 危机
+  表格的响应式  .table-responsive 提的添加边框 .table-bordered
   
### 表单样式  form

+ .form-group 表单盒子 必写
+ .sr-only 隐藏table table 必须写
+ .form-horizontal 内联的 table 和 input 在同一行
+ .form-control 
+ .btn .btn-default 按钮的默认样式
+ <textarea></textarea> 文本域 rows=5
+ 下拉列表 <select><option>1</option><option>2</option><option>3</option></select> 

### 列表 ul无序 ol有序

+ ul 无样式 list-unstyled
+ list-inline
+ 描述 短语列表 <dl><dt>....</dt><dd>....</dd></dl>
    + 水平排列 .dl-horizontal
+ 自动截断 .text-overflow

### 图片

+ .img-responsive 响应式图片 
+ .img-rounded 图片添加圆角
+ .img-circle 圆形图片
+ .img-thumbnail 圆角有边框的图片

### 按钮

+ .close 关闭按钮
+ .caret 三角符号

### 快速悬浮

+ .pull-left .pull-right /左悬浮 右悬浮

### box

+ .center-block 水平居中
+ .clearfix 清除浮动
+ show 显示
+ hidden 隐藏
+ .sr-only 可以对屏幕阅读器以外的设备隐藏内容
+ .sr-onlu-focusable 有焦点的时候再次显示出来
+ 将文本内容替换成图片 .text-hide

### 响应式
  |超小屏幕 | 小屏幕 | 中等屏幕 | 大屏幕
  |手机 (<768px) | 平板 (≥768px) | 桌面 (≥992px) | 桌面 (≥1200px)
---|：---:|：---:|:---:|:---：
.visible-xs-* |	可见 |	隐藏  |	隐藏  |	隐藏
.visible-sm-* | 隐藏 |	可见 |	隐藏  |	隐藏
.visible-md-* | 隐藏 |	隐藏 |	可见  |	隐藏
.visible-lg-* |	隐藏 |	隐藏 |	隐藏  |	可见
.hidden-xs | 隐藏 |	可见 |	可见 |	可见
.hidden-sm | 可见 |	隐藏 |	可见 |	可见
.hidden-md | 可见 |	可见 |	隐藏 |	可见
.hidden-lg  | 可见 | 可见 |	可见 |	隐藏
