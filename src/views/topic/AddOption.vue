<template>
  <a-button type="primary" block @click="handleAdd">
    添加选项
  </a-button>

  <a-modal v-model:visible="showAddModel" title="添加选项" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">
        重置
      </a-button>
      <a-button key="submit" type="primary" :loading="loading"
                @click="handleSubmit"
      >
        提交
      </a-button>
    </template>
    <a-form ref="formRef" :rules="rules"
            :label-col="{span:6}" :model="form"
    >
      <a-form-item label="选项" :wrapper-col="{span:12,offset:2}" name="title">
        <a-input v-model:value="form.title" placeholder="添加选项" />
      </a-form-item>
      <a-form-item label="选项内容" :wrapper-col="{span:12,offset:2}" name="content">
        <a-input v-model:value="form.content" placeholder="选项内容" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup >
import { ref ,defineProps, reactive,defineEmits} from 'vue';
import $axios from '/@/http/model/topic';
import { notification } from 'ant-design-vue';

const showAddModel = ref(false);
const emit = defineEmits(['update-options']);
const formRef = ref();


const props = defineProps({
  id:{
    type:Number,
    required:true
  }
});

const form = reactive({
  topic_id:props.id,
  title:'',
  content:''
});

const rules  = {
  title:[{required:true,message:'选项',trigger:'blur'}],
  content:[{required:true,message:'选项内容',trigger:'blur'}]
};

const handleAdd = () =>{
  showAddModel.value = true;

};


const handleSubmit = ()=>{
  formRef.value.validate().then(()=>{
    $axios.AddOption(form).then(d=>{
      if(d.code===5060){
        notification.success({
          message:d.msg,
          description:d.msg
        });
      }else{
        notification.success({
          message:d.msg,
          description:`${d.data.content}答案${ d.msg}`
        });
        emit('update-options',{
          ...form,
          id:d.data.id
        });

        showAddModel.value = false;
      }
      
    }).catch(()=>{
      notification.error({
        message:'网络异常',
        description:'请检查网络'
      });
    });
    

  });

};


</script>

<style lang='less' spaced>

</style>
