<template>
  <a-layout-sider
    class="sider"
    collapsible
    :collapsed="store.collapse"
    @collapse="handCollapse"
  >
    <div class="logo" />
    <a-menu v-model:selectedKeys="store.selectedKeys" theme="dark" mode="inline">
      <template v-for="(item, index) in slide" :key="index">
        <a-sub-menu v-if="item.children" :key="item.name" :title="item.meta.title">
          <template #icon>
            <Icon :icon="item.meta.sidebarIcon" />
          </template>
          <template #title>
            {{ item.meta.title }}
          </template>
          <template v-for=" chil in item.children" :key="chil.name">
            <template v-if="!chil.children">
              <a-menu-item
                :key="chil.name"
                :title="chil.meta.title"
                @click="handMenuItem(chil)"
              >
                {{ chil.meta.title }}
              </a-menu-item>
            </template>
          </template>
        </a-sub-menu>

        <template v-else>
          <a-menu-item
            :key="item.name"
            :title="item.meta.title"
            @click="handMenuItem(item)"
          >
            <template #icon>
              <Icon :icon="item.meta.sidebarIcon" />
            </template>
            <span class="nav">{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
  



<script >
import { defineComponent } from 'vue';
import { SideStore } from '/@/store/sideinfo';
import { Icon } from '@iconify/vue';
// import { MenuItem } from "ant-design-vue";
import slide from '/@/config/slide';
import { useRouter } from 'vue-router';
import storage from '/@/utils/storage';

export default defineComponent({
  components: {
    Icon
  },
  setup() {
    const store = SideStore();
    // const  selectedKeys =  ;

    const router = useRouter();
    store.$patch(storage.getSessionStorage('side'));

    return {
      slide: slide,
      collapse: store.getCollapse,
      store,
      handCollapse: () => {
        store.changeCollapse();
      },

      handMenuItem: (val) => {
        store.addOpenKey({
          title: val.meta.title,
          name: val.name,
          icon: val.meta.sidebarIcon
        });
        router.push({
          name: val.name
        });
      }
    };
  }
});
</script>

<style lang="less" scoped>
.sider {
  height: calc(100vh - 80px);
  color: #ccc;
  
}

</style>