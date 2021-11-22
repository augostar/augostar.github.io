<template>
  <a-button type="link" @click="handleShowModel">
    查询全部记录
  </a-button>

  <a-drawer
    :title="props.info.wxName+'：答题记录'"
    width="500"
    :closable="false"
    :visible="visible"
 
    @close="onClose"
  >
    <a-table ref="table" :data-source="getTableData" :columns="columns"
             :pagination="false"
             :bordered="false"
             :row-key="(record) => record.id"
    >
      <!-- 页脚 -->
      <template #footer>
        <a-pagination
          v-model:current="pagination.current"
          :total="pagination.total"
          :page-size="pagination.pageSize"
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
  </a-drawer>
</template>

<script setup >
import { ref ,defineProps, reactive} from 'vue-demi';
import Table from '/@/components/basic/Table.vue';
import $axios from '/@/http/model/answerer';



const table = ref();
const getTableData  =ref();
const columns = ref([
  {
    title: 'id',
    dataIndex: 'id',
    width: 50,
    ellipsis: true,
    align: 'center'
  },{
    title:'答题时间',
    dataIndex:'createdAt',
    align:'center'
  },{
    title:'获得的积分',
    dataIndex:'fraction',
    align:'center'

  }
]);

const pagination = reactive({
  current:1,
  total:0,
  pageSize:10
  
});

const renderVNode = (_, { attrs: { vnode } })=> {
  return vnode;
};

const props = defineProps({
  info:{
    type:Object,
    default(){
      return {
        name:'举例',
        wxName:'举例'
      };
    }
  },
  id:{
    type:Number,
    required:true
  }
});

const visible = ref(false);




const onClose =()=>{
  visible.value = false;
};
const handleShowModel = ()=>{

  $axios.getAnswererRecord(pagination.current,pagination.pageSize,props.id).then(d=>{
    pagination.total = d.count; 
    getTableData.value = d.rows;
  });

  visible.value = true;
};

const handPaginationChange = () => {
  handleShowModel();
};


</script>

<style lang='less' spaced>

</style>
