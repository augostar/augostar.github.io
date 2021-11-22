<template>
  <a-button type="link" @click="handleUpdate">
    修改积分
  </a-button>
  <a-modal 
    v-model:visible="isShowUpdateFormModel"
    title="修改积分"
    placement="right"
    :closable="false"
    layout="horizontal"
  >
    <a-form>
      <a-form-item label="积分值">
        <a-input-number v-model:value="form.integral" style="margin: 0 5px;  width: 200px;" :min="1"
                        :max="1000" :step="10" precision="0"
                        :formatter="value => `分数 ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\分数\s?|(,*)/g, '')"
        />
      </a-form-item>
    </a-form>

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
  </a-modal>
</template>

<script setup >
import { reactive, ref,defineProps,defineEmits } from 'vue';
import $axios from '/@/http/model/answerer';
import { notification } from 'ant-design-vue';

const emit =  defineEmits(['UpdateData']);

const isShowUpdateFormModel = ref(false);
const props = defineProps({
  integral:{
    type:Number,
    required:true
  },
  id:{
    type:Number,
    required:true
  }
});
const form = reactive({ integral:0});


// 修改积分
const handleUpdate  = ()=>{
  isShowUpdateFormModel.value =true;
  form.integral = props.integral;
};

const handleCancel = ()=>{
  form.integral = props.integral;
};


const handleSubmit = ()=>{
  $axios.UpdatedAnswerState(props.id,{integral:form.integral}).then((d) => {
    notification.success({
      message: `${d.msg}`,
      description: `${d.msg}状态${d.data.id}`
    });
    isShowUpdateFormModel.value =false;
    emit('UpdateData');

  }).catch(() => {
    notification.error({
      message: ' 状态修改失败',
      description: `修改${props.id}失败`,
      duration: 3
    });
  });
};


</script>

<style lang='less' spaced>




</style>
