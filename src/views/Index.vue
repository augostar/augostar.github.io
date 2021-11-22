<template>
  <a-layout>
    <!-- 全局页头 -->

    <Header />
    <!-- 路由 -->

    <a-layout>
      <Sidebar />

      <a-layout>
        <a-layout-content class="content">
          <div :class="pagestore.spinning.state ? 'example' : 'disnone'">
            <a-spin
              :delay="1000"
              size="large"
              :spinning="pagestore.spinning.state"
              :tip="pagestore.spinning.tip"
            >
              <a-alert
                :type="pagestore.spinning.type"
                :message="pagestore.spinning.message"
                :description="pagestore.spinning.description"
              />
            </a-spin>
          </div>
          <Tags />

          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>

          <!-- 全局页脚 -->
        </a-layout-content>

        <a-layout-footer>
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>



<script>
import { AdminStore } from '/@/store/user';
import { PageStore } from '/@/store/page';

import storage from '/@/utils/storage';
import Header from '/@/views/theme/Header.vue';
import Footer from '/@/views/theme/Footer.vue';
import Sidebar from '/@/views/theme/Sidebar.vue';
import Tags from '/@/views/theme/Tags.vue';

export default {
  components: {
    Header,
    Sidebar,
    Footer,
    Tags
  },
  setup() {
    const store = AdminStore();
    const pagestore = PageStore();
    store.$patch(storage.getSessionStorage('info'));

    return {
      spinning: true,
      pagestore
    };
  }
};
</script>


<style lang="less" scoped>
.content {
  border: #fff solid 10px;
  overflow-x: hidden;
  width: calc(100vw - 200px);
  height: calc(100vh - 150px);
  /* 定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(240, 240, 240, 1);
  }

  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    background-color: rgba(240, 240, 240, 0.5);
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: rgba(240, 240, 240, 0.5);
  }
}

.example {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ant-alert {
  width: 300px;
  height: 100px;
  z-index: 9;
  border-radius: 5px;
}
.disnone {
  display: none;
}
</style>








