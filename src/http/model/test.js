// eslint-disable-next-line no-unused-vars
import _axios from '/@/http/axios';

class Test {

  async getTableData(){
    let return_data = await _axios({
      url: '/test/table.data.json',
      method: 'get'
    }); 
    return return_data.data;
  }


}
export default new Test;
