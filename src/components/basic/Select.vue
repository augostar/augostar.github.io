// 选择器
<template>
  <a-space>
    <a-select
      ref="select"
      v-model:value="formData.classify"
      style="width: 120px"
      :filter-option="false"
      placeholder="Select users"
      show-search
      @search="HandleSearch"
    >
      <a-select-option v-for="item in getClassify" :key="item.id" :value="item.id">
        {{ item.title }}
      </a-select-option>
    </a-select>
  </a-space>
</template>

<script setup >

import { debounce } from 'lodash-es';


// 搜索分类

const HandleSearch = debounce(value => {
  GetClassify(0,10,value);
}, 300);

// 获取分类
const  GetClassify = (offset,limit,value)=>{
  /*
   * $axios.GetClassify(offset,limit,value).then(d=>{
   *   getClassify.value = d.data.rows;
   * });
   */
};

</script>

<style lang='less' spaced>

</style>
