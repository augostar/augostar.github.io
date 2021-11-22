<template>
  <a-form ref="formRef" model="form">
    <a-form-item v-for="item in updateData " :key="item.id" :label="'选项'+item.title">
      <a-input v-model:value="item.content" />
      <a-row>
        <a-col :span="12">
          <a-button type="primary" block @click="handleUpdate(item)">
            保存修改选{{ item.title }}
          </a-button>
        </a-col>
        <a-col :span="12">
          <a-button type="primary" danger block
                    @click="handleDelete(item)"
          >
            删除选项{{ item.title }}
          </a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item>
      <AddOption :id="topic_id" @update-options="updateAddOption" />
    </a-form-item>
  </a-form>
</template>

<script setup >
import { defineProps, reactive, ref } from 'vue';
import $axios from '/@/http/model/topic';
import AddOption from '/@/views/topic/AddOption.vue';

import { notification } from 'ant-design-vue';


const props = defineProps({
  optionData:{
    type:Object,
    required:true
  },
  id:{
    type:Number,
    required:true
  }
});
const formRef = ref();
const topic_id = ref(props.id);

const updateData = reactive(props.optionData);


// 提交修改
const handleUpdate = (val)=>{
  $axios.UpdateOption(val.id,{
    content:val.content
  }).then(d=>{
    notification.success({
      message: d.msg,
      duration: 3

    });

  }).catch(()=>{
    notification.error({
      message: ' 网络异常',
      description: '请检查网络',
      duration: 3

    });
  });


};

const handleDelete = (val)=>{
  $axios.DeleteOptions(val.id).then(d=>{
    notification.success({
      message: d.msg,
      duration: 3

    });
    let index =  updateData.findIndex((item)=>item.id ===val.id);

    updateData.splice(index,1);

  }).catch(()=>{
    notification.error({
      message: ' 网络异常',
      description: '请检查网络',
      duration: 3

    });
  });
};

const updateAddOption=(data)=>{
  updateData.push(data);
  
};


</script>

<style lang='less' spaced>

</style>
