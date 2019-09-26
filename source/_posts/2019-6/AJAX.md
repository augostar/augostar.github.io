---

title: AJAX的使用
date: 2019-6-27
tags: web前段
category: web前段

---

### AJAX

AJAX = Asynchronous JavaScript and XML(异步的javaScript 和XML).
AJAX不是编程语言，而是一种使用现有标准的新方法。
AJAX最大的优点是在不重新加载整个界面的情况下、可以与服务器交换数据并更新部分网页内容。
AJAX不需要任何浏览器插件，但需要用户允许javascript在浏览器执行

<!-- more -->

### AJAX是基于现有的Internet标准

XMLHttpRequest对象(异步的与服务器交换数据)
javaScript/DOM (信息显示/交互)
CSS(给数据定义样式)
XML/JSON(作为转换数据的格式)

``` html

<div><h2>使用AJAX修改文本内容</h2></div>
	<button type="button" onclick="loadXMLDoc()">修改内容</button>

	<script>
		var xmlhttp;
		if(window.XMLHttpRequest){
				//IE7+,firefox,Chrome,Opera,Safari浏览器执行代码
			xmlhttp=new XMLHttpRequest();
		}
		else{
			//IE6,IE5浏览器执行代码
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		function loadXMLDoc(){
		//method请求的类型 GET/POST
		//url 请求地址
		// 是否异步 true异步 false 同步
			xmlhttp.open("method","url",true);
		//send("string")请求发送到服务器
			xmlhttp.send("string");
			//注意只限制POST请求
			//readyState 0 请求未初始化
					//	 1 服务器建立连接
					//   2 请求已接受
					//   3 请求处理中
					//   4 请求完成 且响应已就绪
					// status 返回的状态码 200: "OK" 404: 未找到页面 500 后台出错
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
			//可以编写加载效果
				//responseText 获取字符串形式的响应数据
			//responseXML 获取xml形式的数据
			xmlhttp.responseText;
			}
		}
	</script>

```
