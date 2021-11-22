<template>
  <!-- action="/api/v1/files/image"  -->
  <a-upload
    v-model:file-list="fileList"
    list-type="picture"
    :preview-file="previewFile"
    multiple
    :headers="headers"
    @preview="handUpload"
  >
    <a-button>
      <upload-outlined />
      上传文件
    </a-button>
  </a-upload>
</template>
<script >
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, watch } from 'vue';
import { AdminStore } from '/@/store/user';
import $axios from '/@/http/model/files';


export default defineComponent({
  components: {
    UploadOutlined
  },

  props:{
    infofiles:{
      type:String,  
      required: false,
      default: ''
    }
  },
  emits: ['handUploadFile'],
  setup(props,{emit}) {
    const filedata = reactive();
    const  fileList= ref([]);
    const adminStore = AdminStore();
    const headers  ={Authorization:adminStore.token};

    /*
     * todo 父组件传递 为了更新
     * let    group = secret.MD5(new Date().getTime().toString());
     */

    const previewFile = async (file) => {
      const res = await $axios.updateFiles(file,props.infofiles,adminStore.id);
      if(res.create[0].url){
        let index =   fileList.value.findIndex((e)=> e.name === file.name);
        fileList.value[index].status= 'done';
        fileList.value[index].response = res.create[0];
      }
      return res.create[0].url ;
    };

    const handUpload = (file)=>{
      // file.response.id
      emit('handUploadFile', {
        id :file.response.id,
        url :file.response.url
      });

      console.log(file.response.id);
    };

    watch(filedata ,()=>{
      // console.log(filedata); 
    });
    watch (fileList,()=>{
      // console.log(fileList.value);
    });


    // eslint-disable-next-line no-unused-vars
    let changeupdatefile = (val)=>{
      // console.log(val);
    };
    return {
      headers,
      filedata,
      fileList,
      previewFile,
      changeupdatefile,
      handUpload
    };
  }
});
</script>