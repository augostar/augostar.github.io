<template>
  <a-button type="primary" block @click="showModal">
    添加分类
  </a-button>

  <a-modal v-model:visible="visible" title="添加分类" cancel-text="取消"
           ok-text="提交" @ok="handleSubmit"
  >
    <a-form ref="formRef" :model="form" :rules="rules">
      <a-form-item label="分类名称">
        <a-input v-model:value="form.title" placeholder="分类名称" />
      </a-form-item>
      <a-form-item label="是否启用">
        <a-switch
          v-model:checked="form.state "
          checked-children="启用"
          un-checked-children="禁用"
          :checked-value="1"
          :un-checked-value="0"
          style="margin: 0 10px;"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup >
import { reactive, ref ,toRaw} from 'vue';
import $axios from '/@/http/model/topic';
import { notification } from 'ant-design-vue';


const form = reactive({
  title:'',
  state:1
});
const visible = ref(false);
const formRef = ref();

const rules = {
  title: [{ required: true, message: '请填分类名称', trigger: 'blur' }]
};

// 提交
let handleSubmit = ()=>{
  console.log(form,toRaw(form));
  $axios.AddClassify(form).then((d)=>{
    notification.success({
      message: ` ${d.msg}`,
      description: `${d.msg}${d.data.title}`
    });
  }).catch(()=>{
    notification.error({
      message: ' 网络异常',
      description: '网络异常'
    });
  });

};

// 显示
let showModal = ()=>{
  visible.value= !visible.value;
};



</script>

<style lang='less' spaced>

</style>
