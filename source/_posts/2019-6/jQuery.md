---

title: jquery
date: 2019-7-10
tags: web前段
categories: web前段

---

jquery学习
$(“”).html(content) 改变被选元素的内容html
$(“”).append(content) 向被选元素的内部 HTML 追加内容
$(“”).prepend(content) 向被选元素内部HTML 预设(Prepend) 内容
$(“”).after(content) 在被选元素之后添加html
$(“”).before(content) 在被选元素之前添加HTML

<!-- more -->

js获取屏幕宽度

网页可见区域宽： document.body.clientWidth
网页可见区域高： document.body.clientHeight
网页可见区域宽： document.body.offsetWidth (包括边线的宽)
网页可见区域高： document.body.offsetHeight (包括边线的高)
网页正文全文宽： document.body.scrollWidth
网页正文全文高： document.body.scrollHeight
网页被卷去的高： document.body.scrollTop
网页被卷去的左： document.body.scrollLeft
网页正文部分上： window.screenTop
网页正文部分左： window.screenLeft
屏幕分辨率的高： window.screen.height
屏幕分辨率的宽： window.screen.width
屏幕可用工作区高度： window.screen.availHeight
屏幕可用工作区宽度： window.screen.availWidth

jquery获取屏幕宽度

$(document).ready(function(){
alert($(window).height()); //浏览器当前窗口可视区域高度
alert($(document).height()); //浏览器当前窗口文档的高度
alert($(document.body).height());//浏览器当前窗口文档body的高度
alert($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin
alert($(window).width()); //浏览器当前窗口可视区域宽度
alert($(document).width());//浏览器当前窗口文档对象宽度
alert($(document.body).width());//浏览器当前窗口文档body的宽度
alert($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin
})

jquery 鼠标滚轮事件
``` js 
$('body').mousewheel(function(event, delta) {
    var dir = delta > 0 ? 'Up' : 'Down';
    if (dir == 'Up') {
        console.log('向上滚动');
    } else {
        console.log('向下滚动');
    }
    return false;

});
```