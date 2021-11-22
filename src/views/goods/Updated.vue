<template>
  <div>
    <a-form :label-col="{ style: { width: '150px' } }" :colon="false">
      <a-form-item label="商品名称" :wrapper-col="{ span: 12}">
        <a-input v-model:value="title" />
      </a-form-item>
      <a-form-item label="商品副标题" :wrapper-col="{ span: 12 }">
        <a-input v-model:value="title2" />
      </a-form-item>

      <a-form-item label="商品价格">
        <a-input-number
          v-model:value="price"
          :min="0.1"
          :precision="2"
          :max="2000000000"
          :step="0.01" 
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item label="商品图片">
        <a-image :src="imageInfo.url" :alt="imageInfo.name" />
      </a-form-item>

      <a-form-item label="商品类型">
        <a-select
          v-model:value="goods_type.id"
          :options="options"
          placeholder="商品类型"
          match-input-width
          show-search
          style="width: 200px"
        />
      </a-form-item>

      <a-form-item label=" " :wrapper-col="{ span: 20 }">
        <a-button type="primary" style="width:60%;margin:auto;" @click="HandSubmit">
          修改 
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';

import $axios from '/@/http/model/files';
import $axiosGoods from '/@/http/model/goods';
import { message  } from 'ant-design-vue';

export default {


  props:{
    updatedData:{
      type:Object,
      default(){
        return  { 
          title: '',
          title2:'',
          imageInfo:{
            url:''
          }
          
        }; 
      }
  
    }
  },

  setup (props) {
    const newData = reactive({
      ...props.updatedData,
      imageInfo:{
        url:''
      }
    });

    const options =ref([]);


    $axios.GetImageId(newData.id).then(d=>{
      newData.imageInfo = d.data; 
    });

    const getGoodType = () => {
      $axiosGoods.getGoodType().then((d) => {
        options.value = d;
      });
    };


    const HandSubmit =()=>{
      let data = {
        title:newData.title,
        title2: newData.title2,
        price: newData.price,
        type:newData.goods_type.id
      };

      console.log(data);
      $axiosGoods.updatedGoods(newData.id,data).then(d=>{
        if(d.code===2020){
          message.success(d.msg);
        }else{
          message.error(d.msg);
        }


      }).catch(()=>{
        message.error('网络错误');
      });
      
    };

    getGoodType();


    return {
      ...toRefs(newData),
      options,
      HandSubmit

    };
  }
};
</script>

<style lang="scss" scoped>

</style>