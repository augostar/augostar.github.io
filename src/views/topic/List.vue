<template>
  <div>
    <Table ref="table" :get-data="getTableData" :columns="columns">
      <!-- 自定义操作 -->
      <template #operation="slotProps">
        <a-row>
          <a-col :span="6" :offset="0">
            <a-switch
              v-model:checked="slotProps.record.topic_state.isRecommend"
              checked-children="已推荐"
              un-checked-children="不推荐"
              :checked-value="1"
              :un-checked-value="0"
              @change="HandStateChange('isRecommend',slotProps.record.topic_state.id)"
            />
          </a-col>
          <a-col :span="6" :offset="1">
            <a-switch
              v-model:checked="slotProps.record.topic_state.isRelease "
              checked-children="已发布"
              un-checked-children="未发布"
              :checked-value="1"
              :un-checked-value="0"
              @change="HandStateChange('isRelease',slotProps.record.topic_state.id)"
            />
          </a-col>
          <a-col :span="2" :offset="0">
            <a-button type="link" danger @click="HandDelete(slotProps.record)">
              删除
            </a-button>
          </a-col>
          <a-col :span="2" :offset="1">
            <Update :update-data="slotProps.record" @UpdateData="UpdateData" />
          </a-col>
        </a-row>
      </template>

      <!-- 展开页 -->
      <template #expandedRowRender="slotProps">
        <a-descriptions bordered title="题目详情" layout="vertical">
          <a-descriptions-item label="题目副标题" :span="1">
            {{ slotProps.record.title2 }}
          </a-descriptions-item>
          <a-descriptions-item label="题目内容" :span="1">
            {{ slotProps.record.content }}
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions bordered title="题目答案" layout="vertical">
          <template
            v-for="item in slotProps.record.topic_answers"
            :key="item.id"
          >
            <a-descriptions-item label="答案" :span="1">
              {{ item.content }}
            </a-descriptions-item>
            <a-descriptions-item label="分析" :span="1">
              {{ item.analysis }}
            </a-descriptions-item>
            <a-descriptions-item label="讲解" :span="1">
              {{ item.tips }}
            </a-descriptions-item>
          </template>
        </a-descriptions>

        <a-descriptions bordered title="题目选项">
          <template
            v-for="item in slotProps.record.topic_options"
            :key="item.id"
          >
            <a-descriptions-item label="选项" :span="2">
              {{ item.title }}
            </a-descriptions-item>
            <a-descriptions-item label="选项内容" :span="2">
              {{ item.content }}
            </a-descriptions-item>
          </template>
        </a-descriptions>
      </template>


      <!-- 表头 -->
      <template #header>
        <a-row>
          <a-col :span="3">
            题目
          </a-col>
          <a-col :span="3" style="margin: 0 10px;">
            <Add @UpdateData="UpdateData" />
          </a-col>
          <a-col :span="3" style="margin: 0 10px;">
            <AddClassify @UpdateData="UpdateData" />
          </a-col>
        </a-row>
      </template>
    </Table>
  </div>
</template>

<script setup >
import Table from '/@/components/basic/Table.vue';
import Add from '/@/views/topic/Add.vue';
import AddClassify from '/@/views/topic/AddClassify.vue';
import Update from '/@/views/topic/Update.vue';
import $axios from '/@/http/model/topic';

import { ref } from 'vue';
import { notification } from 'ant-design-vue';

const getTableData = $axios.GetTopic;

const table = ref();
const columns = ref([
  {
    title: 'id',
    dataIndex: 'id',
    width: 50,
    ellipsis: true,
    align: 'center'
  },
  {
    title: '题目标题',
    dataIndex: 'title',
    width: 160,
    ellipsis: true,
    align: 'center',
    // 文字长度 排序
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: '分数',
    dataIndex: 'fraction',
    width: 160,
    ellipsis: true,
    align: 'center',
    // 数据大小排序
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '分类',
    dataIndex: 'topic_classify.title',
    width: 100,
    align: 'center',

    ellipsis: true
  },
  {
    title: '题目类型',
    dataIndex: 'type',
    width: 160,
    align: 'center',

    ellipsis: true
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 160,
    align: 'center'

  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    align: 'center',
    width: 300
  }
]);

// 更新状态
const HandStateChange = (key,id) => {
  $axios.UpdateTopic(id, key).then((d) => {
    notification.success({
      message: ` 状态${d.msg}`,
      description: `${d.msg}状态${d.data.id}`,
      duration: 3
    });
  }).catch(() => {
    notification.error({
      message: ' 状态修改失败',
      description: `修改${id}状态失败`,
      duration: 3
    });
  });
};


// 更新数据
const UpdateData = ()=>{
  table.value.getNewData();
};



// 删除 
const  HandDelete= (data)=>{

  $axios.DeleteTopic(data.id).then(d=>{
    if(d.code === 3020){
      notification.error({
        message: ' 删除失败',
        description: `${d.msg}${data.title}`
      });
    }else{
      notification.success({
        message: ` ${d.msg}`,
        description: `${d.data.id}${d.msg}`
      });
      UpdateData();
    }
  
  }).catch(() => {
    notification.error({
      message: ' 删除失败',
      description: `删除失败${data.title}`
    });
  });
  
  
  
  

};




</script>

<style lang='less' spaced>
</style>
