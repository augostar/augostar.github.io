<template>
  <a-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :key="domain.key"
    :wrapper-col="{ span: 20, offset: 4 }"
    v-bind="index === 0 ? formItemLayout : {}"
    :label="index === 0 ? '商品参数' : ''"
    :name="'domains'+index+ 'value'"
  >
    <a-row>
      <a-col :span="10">
        <a-input
          v-model:value="domain.title"
          placeholder="请输入参数内容"
          style="width: 90%; margin-right: 8px"
        />
      </a-col>
      <a-col :span="10">
        <a-input
          v-model:value="domain.value"
          placeholder="请输入参数内容"
          style="width: 90%; margin-right: 8px"
        />
      </a-col>
      <a-col :span="4">
        <MinusCircleOutlined
          v-if="dynamicValidateForm.domains.length > 1"
          class="dynamic-delete-button"
          :disabled="dynamicValidateForm.domains.length === 1"
          @click="removeDomain(domain)"
        />
      </a-col>
    </a-row>
  </a-form-item>
  <a-form-item v-bind="formItemLayoutWithOutLabel" :wrapper-col="{ span: 16, offset: 4 }">
    <a-button type="dashed" style="width: 60%" @click="addDomain">
      <PlusOutlined />
      添加商品参数
    </a-button>
  </a-form-item>
</template>
<script >
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, watch } from 'vue';


export default defineComponent({
  components: {
    MinusCircleOutlined,
    PlusOutlined
  },

  emits: ['getSpecs'],

  setup(props,{emit}) {
    const formRef = ref();
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };
    const formItemLayoutWithOutLabel = {
      
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    const dynamicValidateForm = reactive({
      domains: []
    });
    const submitForm = () => {
      formRef.value.
        validate().
        then(() => {
          console.log('values', dynamicValidateForm.domains);
        }).
        catch((error) => {
          console.log('error', error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const removeDomain = (item) => {
      let index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    };


    watch(dynamicValidateForm,()=>{
      emit('getSpecs',dynamicValidateForm);
    });

    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeDomain,
      addDomain
    };
  }
});
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>