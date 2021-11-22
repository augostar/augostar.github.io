<template>
  <div>
    <a-table
      :bordered="false"
      :data-source="dataSource"
      :columns="columns"
      :row-key="(record) => record.id"
      :row-class-name="
        (record, index) => (index % 2 === 0 ? 'table-striped' : null)
      "
      :pagination="false"
      size="small"
    >
      <!-- 展示页 -->
      <template v-if="expanded" #expandedRowRender="{ record }">
        <slot name="expandedRowRender" :record="record" />
      </template>

      <!-- 钱 -->
      <template #money="{ record, column }">
        {{ column.moneySymbol }}{{ record.total }}
      </template>

      <!-- 自定义 -->
      <template #operation="{ record }">
        <slot name="operation" :record="record" />
      </template>

      <!-- 自定义其他 -->

      <!-- 自定义状态栏 -->
      <template #state="{ record, column }">
        <template v-for="item in column.stateValue" :key="item.value">
          <p v-if="record.state === item.value" :style="{ color: item.color }">
            {{ item.title }}
          </p>
        </template>
      </template>

      <!-- 表头 -->
      <template #title="dataSource">
        <slot name="header" :dataSource="dataSource" :total="total" />
      </template>


      <!-- 页脚 -->
      <template #footer>
        <a-pagination
          v-model:current="current"
          :total="total"
          :page-size="pageSize"
          @change="handPaginationChange"
        >
          <template #itemRender="{ page, type, originalElement }">
            <a v-if="type === 'prev'" :key="page">上一页</a>
            <a v-else-if="type === 'next'">下一页</a>
            <renderVNode v-else :vnode="originalElement" />
          </template>
        </a-pagination>
      </template>
    </a-table>
  </div>
</template>

<script >
import { defineComponent, reactive, ref, toRefs } from 'vue';
function renderVNode(_, { attrs: { vnode } }) {
  return vnode;
}

import { PageStore } from '/@/store/page';

export default defineComponent({
  components: {
    renderVNode
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    getData: {
      type: Function,
      default: () => {
        return [];
      }
    },
    expanded: {
      type: Boolean,
      default: true
    }
  },
  emits: ['getData'],
  setup(_props) {
    const num = ref(0);
    const dataSource = ref([]);
    const pagestore = PageStore();
    pagestore.spinning.state = true;
    const pagination = reactive({
      current: 1,
      total: 0,
      pageSize: 10
    });
    const getNewData = () => {
      _props.getData(pagination.current, pagination.pageSize).then((d) => {
        dataSource.value = d.rows;
        pagination.total = d.count;
        pagestore.spinning.state = false;
      });
    };
    // 页码更新 更新数据
    const handPaginationChange = () => {
      getNewData();
    };

    // 获取数据 toRefs
    const paginationRefs = toRefs(pagination);
    getNewData();
    return {
      ...paginationRefs,
      dataSource,
      num,
      getNewData,
      handPaginationChange
    };
  }
});
</script>

<style lang='less' spaced>
.table-striped {
  background-color: #fafafa !important;
}
button.ant-btn.ant-btn-error.ant-btn-sm {
  color: red;
}
</style>
