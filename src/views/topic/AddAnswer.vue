<template>
  <a-button type="primary" @click="handAddAnswer">
    添加答案
  </a-button>
  <!-- 添加答案内容 -->
  <a-modal v-model:visible="showAddAnswerModel" title="添加答案" @ok="handleOk">
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
      <a-form-item label="答案" :wrapper-col="{span:12,offset:2}" name="content">
        <a-input v-model:value="form.content" placeholder="添加答案" />
      </a-form-item>
      <a-form-item label="提示" :wrapper-col="{span:12,offset:2}" name="tips">
        <a-input v-model:value="form.tips" placeholder="添加提示" />
      </a-form-item>
      <a-form-item label="解析" :wrapper-col="{span:12,offset:2}" name="analysis">
        <a-input v-model:value="form.analysis" placeholder="添加解析" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup >
import { ref ,defineProps, reactive,defineEmits} from 'vue';
import $axios from '/@/http/model/topic';
import { notification } from 'ant-design-vue';


const emit = defineEmits(['update-answer']);

const props = defineProps({
  id:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  len:{
    type:Number,
    required:true
  }
});

const form = reactive({
  topic_id:props.id,
  content:'',
  analysis:'',
  tips:''
});


const formRef = ref();
const showAddAnswerModel = ref(false);

const handAddAnswer = () =>{
  // console.log(props.len);
  if(props.len>=1){
    if(props.type==='多选'){
      showAddAnswerModel.value = true;
    }else{
      notification.error({
        message: '选项超出',
        description: '选项超出'
      });
    }
    
  }else{
    showAddAnswerModel.value = true;
  }

};
const handleCancel = ()=>{
  formRef.value.resetFields();
};

/* 表单校验 */

const rules  = {
  content:[{required:true,message:'答案',trigger:'blur'}]
};


/* 提交表单 */

const handleSubmit = ()=>{
  formRef.value.validate().then(()=>{
    // console.log(form);
    $axios.AddAnswer(form).then(d=>{
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
        emit('update-answer',{
          ...form,
          id:d.data.id
        });

        showAddAnswerModel.value = false;
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
