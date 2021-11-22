<template>
  <Table ref="table" :get-data="getTableData" :columns="columns">
    <template #operation="slotProps">
      <a-switch
        v-model:checked="slotProps.record.state"
        checked-children="开启"
        un-checked-children="关闭"
        :checked-value="1"
        :un-checked-value="0"
        @change="HandStateChange(slotProps.record.id)"
      />
      <Update :id="slotProps.record.id" :integral="slotProps.record.integral" @UpdateData="UpdateData" />
      <Record :id="slotProps.record.id" :info="{name:slotProps.record.name,wxName:slotProps.record.wxName}" />
    </template>
    <template #expandedRowRender="slotProps">
      <a-descriptions bordered title="用户详情">
        <a-descriptions-item label="微信openid">
          {{ slotProps.record.openid }}
        </a-descriptions-item>
        <a-descriptions-item label="电话号">
          {{ slotProps.record.phone }}
        </a-descriptions-item>
        <a-descriptions-item label="积分">
          {{ slotProps.record.integral }}
        </a-descriptions-item>
        <a-descriptions-item label="微信头像">
          {{ slotProps.record.content }}
          <a-image :src="slotProps.record.avatarUrl " />
        </a-descriptions-item>
      </a-descriptions>

      <a-descriptions bordered title="答题记录">
        <template
          v-for="item in slotProps.record.answerer_records"
          :key="item.id"
        >
          <a-descriptions-item label="答题时间" :span="2">
            {{ item.createdAt }}
          </a-descriptions-item>
          <a-descriptions-item label="获得积分" :span="2">
            {{ item.fraction }}
          </a-descriptions-item>
        </template>
      </a-descriptions>
    </template>
  </Table>
</template>

<script setup >
import Table from '/@/components/basic/Table.vue';
import { inject, ref } from 'vue';
import $axios from '/@/http/model/answerer';
import { notification } from 'ant-design-vue';

import Update from '/@/views/answerer/update.vue';
import Record from '/@/views/answerer/Record.vue';



const table = ref();
const getTableData = $axios.getAnswerer;
const columns = ref(inject('columns'));


// 修改状态
const HandStateChange = (id)=>{
  $axios.UpdatedAnswerState(id).then((d) => {
    notification.success({
      message: ` 状态${d.msg}`,
      description: `${d.msg}状态${d.data.id}`
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


</script>

<style lang='less' spaced>

</style>
