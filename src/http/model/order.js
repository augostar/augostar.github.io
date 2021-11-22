// eslint-disable-next-line no-unused-vars
import _axios from '/@/http/axios';

class Order {

  async getOrder(offset=0,limit=10){
    let return_data = await _axios({
      url: `/api/v1/orderinformation?offset=${offset*limit-limit}&limit=${limit}`,
      method: 'get'
    }); 
    if(!return_data.data) return; 
    return return_data.data.data;
  }


}
export default new Order;
