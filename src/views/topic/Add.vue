<template>
  <a-button type="primary" block @click="visible= !visible">
    添加题目
  </a-button>

  <a-drawer
    v-model:visible="visible"
    title="添加题目"
    placement="right"
    :closable="false"
    :width="800"
    layout="horizontal"
  >
    <a-form ref="formRef" :label-col="{ style: { width: '120px' } }" :model="formData"
            name="formData" :rules="rules"
    >
      <a-form-item label="题目" name="title" :wrapper-col="{ span: 10, offset: 2 }">
        <a-input v-model:value="formData.title" placeholder="题目标题" />
      </a-form-item>
      <a-form-item label="副标题" name="title2" :wrapper-col="{ span: 10, offset: 2 }">
        <a-input v-model:value="formData.title2" placeholder="题目副标题" />
      </a-form-item>
      <a-form-item :name="['isRecommend','isRelease','fraction']" label="状态" :wrapper-col="{span:10,offset:2}">
        <a-switch
          v-model:checked="formData.isRecommend"
          checked-children="已推荐"
          un-checked-children="不推荐"
          :checked-value="1"
          :un-checked-value="0"
          style="margin: 0 10px;"
          name="isRecommend"
        />
        <a-switch
          v-model:checked="formData.isRelease "
          checked-children="已发布"
          un-checked-children="未发布"
          :checked-value="1"
          :un-checked-value="0"
          style="margin: 0 10px;"
        />
        
        
        <a-input-number v-model:value="formData.fraction" style="margin: 0 5px;  width: 100px;" :min="1"
                        :max="1000" :step="10" precision="0"
                        :formatter="value => `分数 ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\分数\s?|(,*)/g, '')"
        />
      </a-form-item>

     
      <a-form-item label="题目内容" name="content">
        <a-textarea v-model:value="formData.content" placeholder="题目内容" allow-clear />
      </a-form-item>

      <a-form-item label="题目分类" name="classify">
        <a-space>
          <a-select
            ref="select"
            v-model:value="formData.classify"
            style="width: 120px"
            :filter-option="false"
            placeholder="选择分类"
            show-search
            @search="HandleSearch"
          >
            <a-select-option v-for="item in getClassify" :key="item.id" :value="item.id">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-space>
      </a-form-item>

      <a-form-item label="题目类型" name="type" :wrapper-col="{span:10,offset:2}">
        <a-radio-group v-model:value="formData.type" name="radioGroup">
          <a-radio v-for="(item,index) in type" :key="index" :value="item">
            {{ item }}
          </a-radio>
        </a-radio-group>
      </a-form-item>

   

      

      <a-form-item v-for="(domain, index) in formData.option" :key="index" 
                   label="题目选项"
                   :name="['formData.option']"
                   :wrapper-col="{span:10,offset:2}"
      >
        <a-input
          v-model:value="domain.title"
          placeholder="选项"
          style=" margin: 8px;width: 60%;"
        />
        <a-input
          v-model:value="domain.content"
          placeholder="答案"
          style=" margin: 8px;width: 60%;"
        />
        <MinusCircleOutlined
          v-if="formData.option.length > 1"
          class="dynamic-delete-button"
          :disabled="formData.option.length === 1"
          @click="removeDomain(domain)"
        />
      </a-form-item>

      <a-form-item label="添加选项" :wrapper-col="{span:10,offset:2}" name="option">
        <a-button type="dashed" @click="addDomain">
          <PlusOutlined />
          添加选项
        </a-button>
      </a-form-item>

      <a-form-item label="题目答案" :wrapper-col="{span:10,offset:2}" name="type">
        <a-checkbox-group v-if="formData.type==='多选'" v-model:value="formData.answerValue">
          <a-checkbox v-for="(item,index) in formData.option" :key="index" :value="item.title">
            {{ item.title }}
          </a-checkbox>
        </a-checkbox-group>

        <a-radio-group v-else v-model:value="formData.answerValue" name="answerValue">
          <a-radio v-for="(item,index) in formData.option" :key="index" :value="item.title">
            {{ item.title }}
          </a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="答案分析" :wrapper-col="{span:10,offset:2}" name="answerAnalysis">
        <a-input v-model:value="formData.answerAnalysis" placeholder="答案分析" />
      </a-form-item>
      <a-form-item label="答案提示" :wrapper-col="{span:10,offset:2}" name="answerTips">
        <a-input v-model:value="formData.answerTips" placeholder="答案提示" />
      </a-form-item>



      <a-form-item :wrapper-col="{span:10,offset:2}">
        <a-button type="primary" block html-type="submit"
                  @click="submitForm"
        >
          提交
        </a-button>
        <a-button block style="margin-top: 10px" @click="resetForm">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup>
// 添加题目

import { reactive, ref, watch,defineEmits } from 'vue';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import $axios from '/@/http/model/topic';
import { AdminStore } from '/@/store/user';

import { debounce } from 'lodash-es';
import { notification } from 'ant-design-vue';


const visible = ref(false);

const  type = ['单选','多选','判断'];
const formRef = ref();


const getClassify = ref([]);

const store = AdminStore();


const formData = reactive({
  title:'',
  title2:'',
  isRecommend:0,
  isRelease:0,
  content:'',
  fraction:1,
  type:'',
  option:[
    {
      title: '',
      content: ''
    }
  ],
  answer:[],
  answerAnalysis:'',
  answerTips:'',
  answerValue:'',
  classify:'',
  author: store.id

});




// 添加输入框
const addDomain = ()=>{
  formData.option.push({
    title: '',
    content: '',
    key: Date.now()
  });

};


// 移除输入框
const removeDomain = (item)=>{
  let index = formData.option.indexOf(item);
  if (index !== -1) {
    formData.option.splice(index, 1);
  }
};

// 重置
const resetForm = () => {
  formRef.value.resetFields();
};

// 监听
watch(() => formData.type,()=>{
  formData.option=[
    {
      title: '',
      content: ''
    }
  ];
});
// defineEmits
const emit =  defineEmits(['UpdateData']);

// 提交
const submitForm= ()=>{
  formRef.value.
    validate().
    then(() => {
      // formData.answer 
      if(typeof formData.answerValue ==='string'){
        formData.answer.push({
          content: formData.answerValue,
          analysis: formData.answerAnalysis,
          tips: formData.answerTips
        });
      }else{
        for (let index = 0; index < formData.answerValue.length; index++) {
          const element = formData.answerValue[index];
          formData.answer.push({
            content: element,
            analysis: formData.answerAnalysis,
            tips: formData.answerTips
          });
        }
      }
      


      $axios.AddTopic(formData).then(d=>{
        notification.success({
          message: ` 状态${d.msg}`,
          description: `${d.msg}状态${d.data.createData.id}`
        });
        
        emit('UpdateData');
        visible.value = false;
      }).catch(()=>{
        notification.error({
          message: ' 网络异常',
          description: '请检查网络异常'
        });
      });
      
      

    }).  // error
    catch(() => {
      
      // console.log('error', error);
    });
  // console.log(formData);
};


// 搜索分类

const HandleSearch = debounce(value => {
  GetClassify(0,10,value);
}, 300);

// 获取分类
const  GetClassify = (offset,limit,value)=>{
  $axios.GetClassify(offset,limit,value).then(d=>{
    getClassify.value = d.data.rows;
  });
};

GetClassify(0,10,'');

const rules = {
  title: [{ required: true, message: '请填写题目名称', trigger: 'blur' }],
  content: [{ required: true, message: '题目内容必须填', trigger: 'blur' }],
  type: [{ required: true, message: '题目类型必须选择', trigger: 'blur' }],
  option:[{required:true,message: '题目选项必须选择'}],
  answer:[{required:true,message: '题目答案必须选择'}]
};
</script>

<style lang='less' spaced>

</style>
