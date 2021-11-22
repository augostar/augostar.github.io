// todo a-cascader 目前只支持 50条类型  需要修个 
<template>
  <a-drawer
    v-model:visible="visible"
    title="商品添加"
    placement="right"
    :closable="false"
    destroy-on-close
    keyboard
    width="50%"
    @close="handClose(visible)"
  >
    <a-button type="primary" @click="goodstypevisible = !goodstypevisible">
      添加商品类型
    </a-button>

    <a-modal
      v-model:visible="goodstypevisible"
      ok-text="提交"
      title="添加商品类型"
      cancel-text="取消"
      @ok="handleGoodsTypeSumbitOk"
    >
      <AddGoodsType @updata="sumbitType" />
    </a-modal>
    <a-divider />

    <a-form
      ref="formRef"
      layout="horizontal"
      :model="submit"
      scroll-to-first-error
      :label-col="{ style: { width: '120px' } }"
      :rules="rules"
    >
      <a-form-item
        label="商品名称"
        :wrapper-col="{ span: 10, offset: 2 }"
        required
        name="title"
      >
        <a-input v-model:value="title" type="text" />
      </a-form-item>
      <a-form-item label="商品副名称" :wrapper-col="{ span: 10, offset: 2 }">
        <a-input v-model:value="title2" type="text" />
      </a-form-item>
      <a-form-item
        label="商品价格"
        :wrapper-col="{ span: 10, offset: 2 }"
        required
        name="price"
      >
        <a-input-number
          v-model:value="price"
          :formatter=" (price) => `￥ ${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(price) => price.replace(/\￥\s?|(,*)/g, '')"
          :precision="2"
          :max="1000000000"
          :step="0.01" 
          style="width: 200px"
        />
      </a-form-item>

      <a-form-item
        label="商品类型"
        required
        help="如果没有你要的类型，请先添加"
        :wrapper-col="{ span: 10, offset: 2 }"
        name="type"
      >
        <a-select
          v-model:value="type"
          :options="options"
          placeholder="商品类型"
          match-input-width
          show-search
          style="width: 200px"
          @search="handleSearch"
        />

        <!-- @change="handChange" -->
      </a-form-item>
      <a-form-item label="状态" required :wrapper-col="{ span: 10, offset: 2 }">
        <a-switch
          v-model:checked="ad"
          checked-children="广告"
          un-checked-children="商品"
          :checked-value="1"
          :un-checked-value="0"
        />
        <a-switch
          v-model:checked="release"
          checked-children="已发布"
          un-checked-children="未发布"
          :checked-value="1"
          :un-checked-value="0"
        />
        <a-switch
          v-model:checked="lack"
          checked-children="已缺货"
          un-checked-children="可购买"
          :checked-value="1"
          :un-checked-value="0"
          :class="lack === 1 ? 'switcherror1' : 'switcherror0'"
        />
      </a-form-item>

      <a-form-item label="商品简介" :wrapper-col="{ span: 16, offset: 2 }">
        <a-textarea v-model:value="introduct" show-count :maxlength="500" />
      </a-form-item>

      <a-form-item
        label="上传文件"
        :wrapper-col="{ span: 16, offset: 2 }"
        name="images"
      >
        <a-row>
          <a-col :span="24">
            <a-image
              :width="200"
              :height="200"
              :src="coverimg"
              fallback="data:image/png;base64,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"
            />
          </a-col>
          <a-col :span="24">
            <UpdateFile
              :infofiles="infofiles"
              @handUploadFile="handUploadFile"
            />
          </a-col>
        </a-row>
      </a-form-item>

      <Domains @getSpecs="getSpecs" />

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          添加
        </a-button>
        <a-button style="margin-left: 10px" @click="onReset">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script  >
import { defineComponent, reactive, ref, toRefs } from 'vue';
import $axios from '/@/http/model/goods';
import { AdminStore } from '/@/store/user';
import AddGoodsType from './AddGoodsType.vue';
import { notification } from 'ant-design-vue';
import UpdateFile from '/@/components/basic/UpdateFile.vue';
import Domains from '/@/components/basic/Domains.vue';
import secret from '/@/utils/secret';

let sumbitdata = {
  title: '',
  title2: '',
  images: 0,
  price: 0,
  state: 0,
  type: '',
  author: '',
  ad: 0,
  release: 1,
  lack: 0,
  infofiles: '',
  introduct: '',
  specs: ''
};

let sumbittype = {
  title: '',
  state: 1,
  author: 0
};

export default defineComponent({
  components: {
    AddGoodsType,
    UpdateFile,
    Domains
  },
  props: {
    addpage: {
      type: Boolean
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const store = AdminStore();
    const submit = reactive(sumbitdata);
    const addtype = reactive(sumbittype);
    const options = ref([]);
    const goodstypevisible = ref(false);
    const coverimg = ref('');
    const formRef = ref();

    const validateImages = async (rule, value) => {
      if (value <= 0) {
        return Promise.reject('必须上传的图片是');
      }
      return Promise.resolve();
    };

    const validateType = async () => {
      if (!submit.type) {
        return Promise.reject('请选择商品类型');
      }
      return Promise.resolve();
    };
    const validatePrice = async () => {
      if (submit.price <= 0) {
        return Promise.reject('请填写商品价格');
      }
      return Promise.resolve();
    };
    const rules = {
      title: { required: true, message: '请输入商品名称', trigger: 'blur' },
      images: { required: true, validator: validateImages, trigger: 'change' },
      type: { required: true, validator: validateType, trigger: 'change' },
      price: { required: true, validator: validatePrice, trigger: 'change' }
      /*
       * title2: '',
       * images: 0,
       * price: 1,
       * state: 0,
       * type: '',
       * author: '',
       * ad: 0,
       * release: 1,
       * lack: 0,
       * infofiles: '',
       * introduct: '',
       * specs: ''
       */
    };

    submit.infofiles = secret.MD5(new Date().getTime().toString());
    submit.author = store.id;

    const getGoodType = () => {
      $axios.getGoodType().then((d) => {
        options.value = d;
      });
    };

    const visible = ref(props.addpage);

    // 关闭添加商品 组件
    const handClose = () => {
      emit('change', false);
    };

    // 选择分类
    const filter = (inputValue, path) => {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    };

    // 重置表单
    const onReset = () => {
      submit.title = '';
      for (const key in sumbitdata) {
        if (Object.hasOwnProperty.call(sumbitdata, key)) {
          let element = submit[key];
          submit[key] =
            typeof element === 'string'
              ? ''
              : typeof element === 'number'
                ? 1
                : '';
        }
      }
      submit.infofiles = secret.MD5(new Date().getTime().toString());
    };

    const handleSearch = (val) => {
      console.log(val);
    };

    // 提交类型
    let handleGoodsTypeSumbitOk = () => {
      $axios.
        addGoodType(addtype).
        then((d) => {
          notification.success({
            message: '成功',
            description: `添加类型成功 ${d.id}`
          });
          goodstypevisible.value = false;
          getGoodType();
        }).
        catch(() => {
          notification.error({
            message: '失败',
            description: '添加类型失败 '
          });
        });
    };
    // 要提交的商品类型
    let sumbitType = (val) => {
      addtype.title = val;
      addtype.author = store.id;
    };

    // 点击上传文件
    const handUploadFile = (val) => {
      submit.images = val.id;
      coverimg.value = val.url;
    };

    // 获取参数

    const getSpecs = (val) => {
      submit.specs = JSON.stringify(val.domains);
    };

    // 提交表单
    const onSubmit = () => {
      formRef.value.
        validate().
        then(() => {
          $axios.
            addGoods(submit).
            then((d) => {
              notification.success({
                message: '成功',
                description: `添加类型成功 ${d.id}`
              });
              onReset();
            }).
            catch(() => {
              notification.error({
                message: '失败',
                description: '添加类型失败 '
              });
            });
        }).
        catch(() => {
          notification.error({
            message: '错误',
            description: '上传的数据出错 '
          });
        });
    };

    const sumbitonRefs = toRefs(submit);
    getGoodType();

    return {
      ...sumbitonRefs,
      coverimg,
      submit,
      options,
      visible,
      goodstypevisible,
      rules,
      formRef,

      handleSearch,

      handClose,
      sumbitType,
      filter,
      onSubmit,
      onReset,
      handleGoodsTypeSumbitOk,
      handUploadFile,
      getSpecs
    };
  }
});
</script>

<style lang='less' spaced>
.switcherror1 {
  background: #ff7875;
}
.switcherror0 {
  background-color: #1890ff;
}
.ant-switch {
  margin: 0 10px;
  margin-right: 10px;
}
.inputnumber {
  width: 160px;
}

.ant-image {
  overflow: hidden;
}
</style>
