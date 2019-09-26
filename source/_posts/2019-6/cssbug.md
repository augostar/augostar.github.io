---

title: CSSBUG
date: 2019-6-20
tags: webBUG
categories: css

---

BFC基本概念

BFC:块级格式化上下文

BFC基本概念：BFC是CSS布局的一个概念，是一块独立的渲染区域，是一个环境，里面的元素不会影响到外部的元素。

父级元素和兄弟元素边距重叠，重叠原则取最大值。空空元素的边距重叠是取margin与padding的最大值

1、根元素，即HTML元素（最大的一个BFC）

2、就对定位元素 （position的值为absolute或fixed）

3、行内块（display为inline-block）

4、表格单元（display为table、table-cell、table-caption、inline-block等 HTML表格相关的属性）

5、弹性盒（display为flex 或者inline-flex）

6、默认值。内容不会被修剪，会呈现在元素框之外（overflow不为visible）

可以让父级元素的高度包含子浮动元素，清除内部的浮动（原理：触发父div的BFC属性是下面的子div都处于父div的同一个BFC时，可以阻止margin重叠）