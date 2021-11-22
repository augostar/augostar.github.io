<template>
  <a-tabs
    v-model:activeKey="routerName" type="editable-card"
    hide-add
    @change="change"
    @edit="onEdit"
  >
    <a-tab-pane
      v-for="pane in store.openkey"
      :key="pane.name"
      :closable="pane.closable"
      :disabled="store.openkey.length<=1"
    >
      <template #tab>
        <span>
          <Icon :icon="pane.icon" />
          {{ pane.title }}
        </span>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>

<script >
import { defineComponent, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
// import { SideStore } from '/@/store/sideinfo';
import { SideStore } from '/@/store/sideinfo';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
    Icon
  },
  setup() {
    let colorArr = ['green', 'cyan', 'blue', 'purple'];
    const store = SideStore();

    const route = useRoute();
    const router = useRouter();
    let routerName = ref(route.name);
    watch(route, (to) => {
      routerName.value = to.name;
    });
    let handremove = (val) => {
      if (val.name === route.name) {
        router.push({
          name:store.openkey[0].name
        });
      }
      store.removeOpenKey(val);
    };

    const onEdit = (targetKey, action) => {
      if (action === 'remove') {
        if (targetKey === routerName.value) {
          router.push({
            name:store.openkey[0].name
          });
        }
        store.removeOpenKey(targetKey);
      } 
    };
 

    let change = (val) =>{
      store.selectedKeys=[val];
      router.push({
        name: val
      });

    };
    return {
      colorArr,
      store,
      handremove,
      routerName,
      onEdit,change
    };
  }
});
</script>

<style lang="less" scoped>
.tags {
  padding: 3px;
  border-top: 0.5px solid #ccc;
  background-color: #fff;
  flex-wrap: nowrap;
}
.tags:hover {
  cursor: pointer;
}
.ant-tag {
  min-width: 100px;
  text-align: center;
}

.ant-tabs-extra-content>span{
  display: none ;
}
</style>
