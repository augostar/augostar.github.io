// eslint-disable-next-line no-unused-vars
import _axios from '/@/http/axios';

class Order {

  /* 查询 */
  // 排行榜
  async getAnswererRanking(offset=0,limit=10){
    let return_data = await _axios({
      url: `/cms/v1/answerer/new?offset=${offset*limit-limit}&limit=${limit}`,
      method: 'get'
    }); 
    if(!return_data.data) return; 
    return return_data.data.data;
  }

  // 查询答题者
  async getAnswerer(offset=0,limit=10){
    let back = await _axios({
      url:`/cms/v1/answerer?offset=${offset*limit-limit}&limit=${limit}`,
      method: 'get'
    });
    return back.data.data;
  } 

  // 答题记录
  async getAnswererRecord(offset=0,limit=10,id){
    let back = await _axios({
      url:`/cms/v1/answerer_record/${id}?offset=${offset*limit-limit}&limit=${limit}`,
      method: 'get'
    });
    return back.data.data;
  }



  /* 修改 */

  async UpdatedAnswerState(id,data){
    let back = await _axios({
      url:`/cms/v1/answerer_record/${id}`,
      method: 'put',
      data:{
        state:1,
        integral:data.integral
      }
    });
    return back.data;
  }

}
export default new Order;
