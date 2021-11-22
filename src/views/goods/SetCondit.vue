<template>
  <a-modal v-model:visible="visible" title="设置商品查询条件" 
           mask
           :mask-closable="false"
           :keyboard="false"
           ok-text="设置"
           cancel-text="取消"
           :destroy-on-close="true"
           @ok="handleOk"
           @cancel="handcancel"
  >
    <a-form>
      <a-form-item label="商品状态" :wrapper-col="{ span: 20, offset: 4 }">
        <a-switch
          v-model:checked="ad"
          checked-children="广告"
          un-checked-children="商品"
          :checked-value="1"
          :un-checked-value="0"
          @change="handStateChange('ad')"
        />
        <a-switch
          v-model:checked="release"
          checked-children="已发布"
          un-checked-children="未发布"
          :checked-value="1"
          :un-checked-value="0"
          @change="handStateChange('release')"
        />
        <a-switch
          v-model:checked="lack"
          checked-children="已缺货"
          un-checked-children="可购买"
          :checked-value="1"
          :un-checked-value="0"
          :class="lack===1? 'switcherror1':'switcherror0'"
          @change="handStateChange('lack')"
        />
      </a-form-item>
      <a-form-item label="商品名称关键字">
        <a-input v-model:value="search" type="text" />
      </a-form-item>
      <a-form-item label="商品类型" :wrapper-col="{ span: 20, offset: 2 }">
        <a-select
          v-model:value="type"
          :options="options"
          placeholder="商品类型"
          match-input-width
          show-search
          style="width: 200px"
          @search="handleSearch"
        />
      </a-form-item>
      <a-form-item label="最低价格区间" :wrapper-col="{ span: 20, offset: 1 }">
        <a-switch
          v-model:checked="pricemin.state"
          checked-children="开启"
          un-checked-children="关闭"
          :checked-value="true"
          :un-checked-value="false"
          style=" margin-right: 20px;"
        />
        <a-input-number v-model:value="pricemin.value" />
      </a-form-item>
      <a-form-item label="最高价格区间" :wrapper-col="{ span: 20, offset: 1 }">
        <a-switch
          v-model:checked="pricemax.state"
          checked-children="开启"
          un-checked-children="关闭"
          :checked-value="true"
          :un-checked-value="false"
          style=" margin-right: 20px;"
        />
        <a-input-number v-model:value="pricemax.value" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script >
import { defineComponent, reactive, ref, toRefs } from 'vue';
import $axios from '/@/http/model/goods';

export default defineComponent({

  props:{
    condit:Boolean
  },
  emits: ['conditChange'],
  setup(_props,{emit}) {
    const visible = ref(_props.condit);
    const options = ref([]);
    const getGoodType = () => {
      $axios.getGoodType().then((d) => {
        options.value = d;
      });
    };


    const where  =reactive({
      ad:2,
      release:2,
      lack:2,

      type:'',
      
      pricemin:{
        state:false,
        value:0
      },
      pricemax:{
        value:0,
        state:false
      },
      search:''

    });
  
    const handcancel =()=>{
      
      emit('conditChange', false);

    };
    const handStateChange = ()=>{
      // where[val] = 1;
    };
    const paginationRefs = toRefs(where);
    getGoodType();

    return{
      ...paginationRefs,
      options,

      where,
      visible,handcancel,handStateChange
    };
  }
});
</script>

<style lang='less' spaced>

</style>
