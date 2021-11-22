<template>
  <a-button type="link" @click="showModal">
    修改
  </a-button>
  <a-drawer
    title="修改题目"
    width="520"
    :closable="false"
    :visible="isVisible"
    @close="handleCloseDrawer"
  >
    <a-form ref="formRef" model="form" :label-col="{ span: 3, offset: 1 }">
      <a-form-item label="标题" name="title" :wrapper-col="wrapperCol">
        <a-input v-model:value="form.title" placeholder="标题" />
      </a-form-item>
      <a-form-item label="副标题" name="title2" :wrapper-col="wrapperCol">
        <a-input v-model:value="form.title2" placeholder="副标题" />
      </a-form-item>
      <a-form-item label="题目内容" name="content" :wrapper-col="wrapperCol">
        <a-textarea
          v-model:value="form.content"
          placeholder="题目内容"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="题目分类" name="classify" :wrapper-col="wrapperCol">
        <a-space>
          <a-select
            ref="select"
            v-model:value="form.classify"
            style="width: 120px"
            :filter-option="false"
            placeholder="选择分类"
            show-search
            @search="HandleSearch"
          >
            <a-select-option
              v-for="item in getClassify"
              :key="item.id"
              :value="item.id"
            >
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-space>
      </a-form-item>
      <a-form-item label="题目类型" name="type" :wrapper-col="wrapperCol">
        <a-radio-group v-model:value="form.type" name="radioGroup">
          <a-radio v-for="(item, index) in type" :key="index" :value="item">
            {{ item }}
          </a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="题目分数" name="fraction" :wrapper-col="wrapperCol">
        <a-input-number v-model:value="form.fraction" style="margin: 0 5px;  width: 100px;" :min="1"
                        :max="1000" :step="10" precision="0"
                        :formatter="value => `分数 ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\分数\s?|(,*)/g, '')"
        />
      </a-form-item>

      <a-form-item
        v-for="item in form.answers"
        :key="item.id"
        :label="'答案' + item.content"
        :wrapper-col="wrapperCol"
      >
        <a-space direction="vertical" :size="1">
          <a-card>
            <p>
              题目提示<a-input
                v-model:value="item.tips"
                placeholder="题目提示"
              />
            </p>
            <p>
              题目解析
              <a-input v-model:value="item.analysis" placeholder="题目解析" />
            </p>
            <p>
              <a-button
                type="primary"
                danger
                block
                @click="HandDeleteAnswer(item)"
              >
                删除答案 {{ item.content }}
              </a-button>
            </p>
            <p>
              <a-button type="primary" block @click="HandUpdateAnswer(item)">
                保存修改的答案 {{ item.content }}
              </a-button>
            </p>
          </a-card>
        </a-space>
      </a-form-item>
      <a-form-item />
    </a-form>

    <a-row>
      <a-col :span="4" :offset="1">
        <AddAnswer :id="form.id" :type="form.type" :len="form.answers.length"
                   @update-answer="updateAddAnswer"
        />
      </a-col>
      <a-col :span="4" :offset="1">
        <a-button type="primary" @click="showChildrenDrawer">
          修改选项
        </a-button>
      </a-col>
    </a-row>

  

    


    <a-drawer
      title="修改选项"
      width="320"
      :closable="false"
      :visible="childrenDrawer"
      @close="onChildrenDrawerClose"
    >
      修改选项
      <UpdateOption :id="form.id" :option-data="form.options" />
    </a-drawer>
    <div
      :style="{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e8e8e8',
        padding: '10px 16px',
        textAlign: 'right',
        left: 0,
        background: '#fff',
        borderRadius: '0 0 4px 4px',
      }"
    >
      <a-button style="margin-right: 8px" @click="onReset">
        重置
      </a-button>
      <a-button type="primary" @click="onClose">
        提交
      </a-button>
    </div>
  </a-drawer>
</template>

<script setup >
import { ref, defineProps, reactive,defineEmits } from 'vue';
import $axios from '/@/http/model/topic';
import { debounce } from 'lodash-es';
import { notification } from 'ant-design-vue';


import AddAnswer from '/@/views/topic/AddAnswer.vue';
import UpdateOption from '/@/views/topic/UpdateOption.vue';
// 父页面传值
const props = defineProps({
  updateData: {
    type: Object,
    required: true
  }
});

const emit =  defineEmits(['UpdateData']);


// 定义变量
const form = reactive({
  id:0,
  title: '',
  title2: '',
  content: '',
  classify: '',
  answers: [],
  options:[],
  fraction:0,
  type:''
});
const getClassify = ref([]);
const type = ['单选', '多选', '判断'];
const wrapperCol = { span: 16, offset: 2 };


// visible
let isVisible = ref(false);
let childrenDrawer = ref(false);

const showModal = () => {
  isVisible.value = true;
  GetClassify(0, 10, '');
  onReset();
};

const showChildrenDrawer = () => {
  childrenDrawer.value = true;
};

// 提交
const onClose = () => {

  let data = {
    title: form.title,
    title2: form.title2,
    content: form.content,
    fraction: form.fraction,
    type: form.type
  };
  if(typeof form.classify !== 'string'){
    data.classify =form.classify;
  }

  $axios.UpdateTopicContent(form.id,data).then(d=>{

    emit('UpdateData');
    childrenDrawer.value = false;
    if(d.code===2020){
      notification.success({
        message: d.msg,
        description:  d.data.title+d.msg
      });
      isVisible.value = false;
    }else{
      notification.error({
        message: ' 异常',
        description: '请检查网络'
      });
    }
    
  }).catch(()=>{
    notification.error({
      message: ' 网络异常',
      description: '请检查网络'
    });
  });

  
};
const onChildrenDrawerClose = () => {
  childrenDrawer.value = false;
};

const onReset = () => {
  form.id = props.updateData.id;
  form.title = props.updateData.title;
  form.title2 = props.updateData.title2;
  form.content = props.updateData.content;
  form.classify = props.updateData.topic_classify.title;
  form.type = props.updateData.type;
  form.answers = props.updateData.topic_answers||[];
  form.options = props.updateData.topic_options||[];
  form.fraction = props.updateData.fraction;
};

const HandleSearch = debounce((value) => {
  GetClassify(0, 10, value);
}, 300);

// 获取分类
const GetClassify = (offset, limit, value) => {
  $axios.
    GetClassify(offset, limit, value).
    then((d) => {
      getClassify.value = d.data.rows;
    }).
    catch(() => {
      notification.error({
        message: ' 网络异常',
        description: '请检查网络',
        duration: 3

      });
    });
};

// 删除答案
const HandDeleteAnswer = (val) => {
  $axios.DeleteAnswer(val.id).
    then((d) => {
      notification.success({
        message: d.msg,
        duration: 3

      });
      let index =  form.answers.findIndex((item)=>item.id ===val.id);
      form.answers.splice(index,1);

    }).
    catch(() => {
      notification.error({
        message: ' 网络异常',
        description: '请检查网络',
        duration: 3

      });
    });
};

/* @desc 修改答案 */
const HandUpdateAnswer = (val) => {
  $axios.
    UpdateAnswer(val.id, {
      analysis: val.analysis,
      tips: val.tips
    }).
    then((d) => {
      notification.success({
        message: d.msg,
        description: d.msg
      });
    }).
    catch(() => {
      notification.error({
        message: ' 网络异常',
        description: '请检查网络',
        duration: 3

      });
    });
};

/* 添加答案 */

const updateAddAnswer = (data)=>{
  form.answers.push(data);
};


const handleCloseDrawer = ()=>{
  isVisible.value = false;
};

</script>

<style lang='less' spaced>

</style>
