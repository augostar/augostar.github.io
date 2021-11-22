import _axios from '/@/http/axios';

class Visualization {
  // api/v1/visualization/goods/type
  async GetGoodsType() {
    
    let return_data = await _axios({
      url:'api/v1/visualization/goods/type',
      method:'GET'
    });
    let data  = return_data.data.data||{};
    let title_array = [];
    let information = [];
    if(!data||!data.goodsType){
      return;
    }
    for (const iterator of data.goodsType) {
      title_array.push(iterator.title);
      let index =  await data.goodsNumber.findIndex(e=>e.type === iterator.id);
      information.push({
        id:iterator,
        value:index>=0? data.goodsNumber[index].count:0,
        name:iterator.title
      });

    }

    return {title_array,information}; 
  }



}

export default new Visualization;