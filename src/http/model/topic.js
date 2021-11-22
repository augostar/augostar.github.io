// eslint-disable-next-line no-unused-vars
import _axios from '/@/http/axios';
import axios from 'axios';

class Order {

  // 获取题
  async GetTopic(offset=0,limit=10){
    let return_data = await _axios({
      url: `/cms/v1/topic/?offset=${offset*limit-limit}&limit=${limit}`,
      method: 'get'
    }); 
    if(!return_data.data) return; 
    return return_data.data.data;
  }

  /* 修改 */
  // 修改状态
  async UpdateTopic(id,data){
    let return_data = await _axios({
      // /cms/v1/topic_state/3
      url: `/cms/v1/topic_state/${id}`,
      method: 'put',
      data:{
        value:data
      }
    }); 
    if(!return_data.data) return; 
    return return_data.data;
  }

  // 修改答案
  async UpdateAnswer(id,data){
    let return_data = await _axios({
      url:`/cms/v1/topic_answer/${id}`,
      method:'put',
      data:data
    });    
    if(!return_data) return;
    return return_data.data;
  }
  // 修改选项
  async UpdateOption(id,data){
    let back = await _axios({
      url:`/cms/v1/topic_option/${id}`,
      method:'put',
      data:data
    });
    return back.data;
  }

  // 修改题
  async UpdateTopicContent(id,data){
    let back =   await _axios({
      url:`/cms/v1/topic/${id}`,
      method:'put',
      data:data
    });
    return back.data;
  }

  /*  添加 */

  // 添加题目
  async AddTopic(data){
    let getData = await _axios({
      url:'/cms/v1/topic',
      method:'post',
      data:data
    });
    return  getData.data;
  }

  // 添加答案
  async AddAnswer(data){
    let back = await _axios({
      url:'/cms/v1/topic_answer',
      method:'post',
      data:data
    });
    return back.data;
  }

  // 添加选项
  async AddOption(data){
    let back = await _axios({
      url:'/cms/v1/topic_option',
      method:'post',
      data:data
    });
    return back.data;
  }





  // 获取

  async GetClassify(offset=0,limit=50,search=''){
    let url = `/cms/v1/topic_classify?offset=${offset}&limit=${limit}`;
    if(search!==''){
      url = `${url}&search=${search}`;
    }
    let getData = await _axios({
      url:url
    });

    return getData.data;
  }



  // 添加分类

  async AddClassify(data){
    let  getData = await _axios({
      url:'/cms/v1/topic_classify',      
      method:'post',
      data:data
    });

    return getData.data;
  }


  // 删除答案
  async DeleteAnswer(id){
    let  back = await _axios({
      url:`/cms/v1/topic_answer/${id}`,
      method:'DELETE'
    });
    return  back.data;
  }


  // 删除 题目
  async DeleteTopic(id){
    let  back = await _axios({
      url:`/cms/v1/topic/${id}`,
      method:'DELETE'
    });
    return  back.data;
  }
  // 删除选项 
  async DeleteOptions(id){
    let back = await _axios({
      url:`/cms/v1/topic_option/${id}`,
      method:'delete'
    });
    return back.data;
  }

  

}
export default new Order;
