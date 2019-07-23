---
title: swipt制作滑块
date: 2019-1-1 17:44:07
tags: swipt
category: web前段
top: true
---

### swipt编写滑块 点击改变滑块
主要功能另个页面传递一个参数 根据这个参数来判断从第几个滑块开始
点击导航标题 选择指定滑块 
滑动页面 显示上个或者下一个页面
其中的知识内容 swipt初始化 并使用    initialSlide指定初始显示的内容,
vue页面之间的传值 以及vue点击事件@click点击事件 
css3布局 弹性盒子布局
废话不多说直接上代码 
<!-- more -->
```
<!-- 要跳转的页面 -->
<template>
  <div class="user">
  <!-- 点击事件通过点击来确定跳转后的页面显示指定swiper索引 -->
   <button @click="goParam(0)">全部</button>
   <button @click="goParam(1)">待支付</button>
   <button @click="goParam(2)">待使用</button>
   <button @click="goParam(3)">退款</button>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      <!-- 定义要传递的参数 -->
      indexs:0
    };
  },methods:{
    <!-- 跳转的函数 传递参数 -->
    goParam:function(i){
      this.$router.push({path:'order',name:"order",params:{
        key:i,
      }})
    }
  }
};
</script>

<!-- 滑块页面 -->
<template>
  <div class="order">
    <div class="header">
      <div @click="fun3">返回</div>
      <div>标题</div>
      <div>分类</div>
    </div>
    <div class="tab">
      <ul>
      <!-- 点击切换 -->
        <li v-for="(item,index) in list" :key="index">
          <div @click="fun2(index)" :class="indexs==index?btn:''">{{item}}</div>
        </li>
      </ul>
    </div>
    <!-- 定义swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      <!-- 定义参数 indexs通过indexs判定要加下边框的索引 -->
      indexs: 0,
      <!-- 定义要class属性的名称 -->
      btn: "btn",
      <!-- 定义swiper变量 方便再次使用  -->
      swipers: "",
      list: ["全部", "待支付", "待使用", "退款"],
      <!-- 用于判定是否是第一次渲染 -->
      flg: true
    };
  },
  mounted: function() {
    <!-- 初始化值 传递的值是否未定义 -->
    if (this.$route.params.key != undefined) {
      this.indexs = this.$route.params.key;
    }
    this.flg = false;
    <!-- 初始化滑块 -->
    this.fun();
  },
  methods: {
    fun() {
      var _this = this;
      <!-- 初始化swiper并指定到指定位置 -->
      var swiper = new Swiper(".swiper-container", {
        initialSlide: _this.indexs,
        on: {
          slideChangeTransitionEnd: function() {
            if (_this.flg == true) {
              _this.indexs = swiper.activeIndex;
            }
            _this.flg = true;
          }
        }
      });
      this.swipers = swiper;
    },
    fun2(i) {
        <!-- 点击切换 -->
      this.swipers.slideTo(i, 1000, false);
      this.indexs = i;
    },
    fun3() {
      <!-- 返回 -->
      this.$router.push({
        path: "/",
        name: "user"
      });
    }
  }
};
</script>
<!-- 样式 弹性盒子布局-->
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0.3rem;
  height: 0.8rem;
  line-height: 0.8rem;
}
.tab {
  width: 100%;
}
.tab > ul {
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-around;
  line-height: 0.6rem;
  border-bottom: 0.03rem solid #c0c0c0;
}
.tab ul li {
  text-align: center;
  width: 1rem;
}
.btn {
  border-bottom: 0.03rem solid #0066cc;
}
.swiper-slide {
  width: 100%;
  height: 5rem;
}
</style>

```
