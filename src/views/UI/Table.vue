<template>
  <div>
    <Table :get-data="getTableData" :columns="columns">
      <!-- 定义表头 -->
      <template #header="slotProps">
        {{ "自定义" }}  总数据长度 {{ slotProps.dataSource.length }}
      </template>
      <!--自定义 展示页 -->
      <template #expandedRowRender="slotProps">
        {{ "展示内容" }} id {{ slotProps.record.id }}
      </template>
    </Table>
  </div>
</template>

<script >
import Table from '/@/components/basic/Table.vue';
import $axios from '/@/http/model/test';
import { defineComponent, ref } from 'vue';

export default defineComponent( {
  components: {
    Table
  },
  setup(){
    const columns = ref([
      {
        title: 'id',
        dataIndex: 'id',
        width: 160,
        ellipsis: true,
        align: 'center'
      },
      {
        title: 'name',
        dataIndex: 'name',
        width: 160,
        ellipsis: true,
        align: 'center',
        // 文字长度 排序
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: 160,
        ellipsis: true,
        align: 'center',
        // 数据大小排序
        sorter: (a, b) => a.age - b.age
      }
      
    ]);
    return{
      columns,
      getTableData:$axios.getTableData
    };
  }
});
</script>

<style lang="scss" scoped>
</style>