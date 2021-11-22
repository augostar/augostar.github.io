<template>
  <a-row>
    <a-col :span="12">
      <!-- {{ answerer }} -->

      <a-row class="header">
        <a-col :span="4" style="text-align: center;">
          排名
        </a-col>
        <a-col :span="4">
          微信名称
        </a-col>
        <a-col :span="4">
          微信头像
        </a-col>
        <a-col :span="4">
          用户名称
        </a-col>
        <a-col :span="4">
          积分
        </a-col>
        <a-col :span="4">
          电话号码
        </a-col>
      </a-row>
      <a-row v-for="(item,index) in answerer" :key="item.id" class="table">
        <a-col :span="4" style="text-align: center;">
          {{ index+1 }}         
        </a-col>
        <a-col :span="4">
          <!--  -->
          {{ item.wxName }}
        </a-col>
        <a-col :span="4">
          <a-image :src=" item.avatarUrl " width="50px" height="50px" />
        </a-col>
        <a-col :span="4">
          {{ item.name[1]+ item.name.replace(/[\u4e00-\u9fa5]./g, "*") }}
        </a-col>
        <a-col :span="4">
          {{ item.integral }}
        </a-col>
        <a-col :span="4">
          {{ item.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') }}
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="12">
      {{}}
    </a-col>
  </a-row>
</template>


<script lang="ts">
import $axios from '/@/http/model/answerer';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    let answerer = ref();

    onMounted(() => {
      $axios.getAnswererRanking(1, 10).then((d) => {
        answerer.value = d.rows;
      });
    });

    return {
      answerer

      /*
       * deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
       * images,
       * goods_type,
       * onFinish
       */
    };
  }
});
</script>


<style lang="less" scoped>
.home {
  padding: 0 10px;
}
.divider {
  width: 80%;
  padding: 20px;
}

.avatar{
  width: 30px;
  height: 30px;
  
}
.header{
  font-weight: bold;
}

.table{
  padding: 10px;
}

.a{
  margin: 10px;
  display: inline-flex;
  display: inline-block;
  width: 200px;
}
</style>


