<template>
  <a-layout-header class="header">
    <a-row align="middle" justify="center">
      <a-col :span="8" style="text-align: start">
        <img
          class="logo" :src="store.portrait" alt="logo"
          srcset=""
        >
      </a-col>
      <a-col :span="8">
        <Title :title="title" color="white" />
      </a-col>
      <a-col :span="8" style="text-align: end">
        <a-row>
          <a-col :span="12" />
          <a-col :span="8">
            <a-badge dot>
              <a-button ghost>
                消息
              </a-button>
            </a-badge>
          </a-col>
          <a-col :span="4">
            <a-button ghost>
              {{ store.nickName }}
              <!-- <a-image src="store"></a-image> -->
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import { title } from '/@/config/basic';

import { AdminStore } from '/@/store/user';
import Title from '/@/components/basic/Title.vue';

export default {
  components: {
    Title
  },
  setup() {
    const store = AdminStore();

    return {
      store,
      title
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 80px;
  width: 100vw;
  color: #ccc;
}
.logo {
  width: 60px;
  height: 60px;
  margin: 10px;
}
// ant-col ant-col-8
.ant-col {
  text-align: center;
}
</style>

