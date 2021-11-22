<template>
  <a-row>
    <a-col v-for="(item,index) in icon" :key="index" :span="6">
      <p style="text-align: center;font-size: 16px;">
        <Icon
          :icon="item"
        />
        {{ item }}
      </p>
    </a-col>
  </a-row>
</template>

<script>
import {  ref } from 'vue';
import { Icon } from '@iconify/vue';

export default {
  components:{
    Icon
  },
  setup () {
    /*
     * const state = reactive({
     *   icon: 0
     * });
     *   ...toRefs(state)
     */

    // https://iconify.design/
    const icon = ref([
      'healthicons:ui-settings',
      'ant-design:home-filled',
      'bx:bxl-shopify',
      'cib:about-me',
      'healthicons:ui-menu-grid-outline',
      'mdi-light:home',
      'cif:cn',
      'mdi:home',
      'cil:search',
      'ri:lock-password-line',
      'jam:triangle-danger',
      'ant-design:arrow-down-outlined',
      'ant-design:arrow-right-outlined',
      'fluent:content-view-gallery-20-filled',
      // 地形
      'geo:ui-earth-east',

      'fa-regular:comment-dots',
      'ant-design:apple-filled',
      'ant-design:android-outlined',
      'ant-design:alipay-square-filled',

      // 天气
      'wi:day-sunny'
    ]);
  
    return {
      icon
    };
  }
};
</script>

<style lang="scss" scoped>

</style>