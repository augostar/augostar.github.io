// http://localhost:7001/cms/v1/goodstate
import _axios from '/@/http/axios';

class Goods {

  // 商品 广告
  async goodsad() {
    let retdata = { data: {} };
    retdata = await _axios({
      url: '/api/v1/goodstate',
      method: 'get'
    });
    retdata = retdata.data.data;
    return retdata;
  }

  // 获取商品
  async getGoods(curr, pagesize) {
    const { data } = await _axios({
      url: `/api/v1/goods?offset=${curr * pagesize - pagesize}&limit=${pagesize}`,
      method: 'get'
    });
    const retdata = data.data;
    return retdata;
  }

  
  /**
   * @description 修改商品信息
   * @param {int} id  修改id
   * @param {object} data  修改的商品信息
   * @return promise
   * @memberof Goods
   */
  /* @desc修改商品信息 */
  async updatedGoods(id,data){
    const returnData = await _axios({
      url:`/api/v1/goods/${id}`,
      method:'PUT',
      data:data      
    });
    
    return returnData.data;
  }

  // 根据id 获取商品
  async idGetGoods(id) {
    const { data } = await _axios({
      url: `/api/v1/goods/${id}`,
      method: 'get'
    });
    const retdata = data.data;
    return retdata;
  }


  // 修改商品状态 // cms/v1/goodstate/1/edit?modify=ad
  async modifyGoodsState(id, para) {
    const { data } = await _axios({
      url: `/api/v1/goodstate/${id}/edit?modify=${para}`,
      method: 'get'
    });
    const retdata = data.data;
    return retdata;
  }

  // 获取商品类型 /cms/v1/goodtype
  async getGoodType(para = '') {
    const { data } = await _axios({
      
      url: `/api/v1/goodtype/?search=${para}`,
      method: 'get'
    });
    const newdata = data.data;
    const retdata = [];
    newdata.rows.forEach(el => {
      retdata.push({
        value: el.id,
        label: el.title
      });
    });
    return retdata;
  }

  // 添加商品类型
  async addGoodType(sumbitdata) {
    const { data } = await _axios({
      url: '/api/v1/goodtype',
      method: 'post',
      data: sumbitdata
    });
    return data.data;
  }


  // 添加商品
  async addGoods(sumbitdata) {
    const { data } = await _axios({
      url: '/api/v1/goods',
      method: 'post',
      data: sumbitdata
    });
    return data.data;
  }
  // /cms/v1/goods/13
  async delete(id) {
    const { data } = await _axios({
      url: `/api/v1/goods/${id}`,
      method: 'delete'
    });
    return data.data || {};
  }

  async getGoodsType(offset=0,limit=10) {
    let return_data  = await _axios({
      url: `/api/v1/goodtype?offset=${offset*limit-limit}&limit=${limit}`,
      method: 'get'
    });
    console.log(return_data);
    if(!return_data.data) return; 
    return return_data.data.data;
  }



  /**
   * @desc 修改商品类型
   * @param {修改id} id 
   * @param {修改的参数} parameter 
   * @returns 
   */
  // @desc 修改商品类型
  async updateGoodsTypeState(id, parameter) {
    const { data } = await _axios({
      url: `/api/v1/goodtype/${id}`,
      method: 'put',
      data: parameter
    });
    return data.data;
  }




  /**
   * @description 删除商品
   * !删除商品
   * @desc 删除商品类型
   * @param {*} id
   * @return {*} 
   * @memberof Goods
   */
  // @desc 删除商品类型
  async deleteGoodsType(id) {
    const { data } = await _axios({
      url: `/api/v1/goodtype/${id}`,
      method: 'delete'
    });
    return data;
  }

}


export default new Goods;