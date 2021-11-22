import _axios from '/@/http/axios';
class Files {
  async updateFiles(file,group,id) {
    let returnData = {data:{}};
    var form = new FormData();
    form.append('author', id);
    form.append(group, file);
    returnData = await _axios({
      url: '/api/v1/files/image',
      method: 'POST',
      data:form
    });
    returnData = returnData.data.data;
    return returnData;
  }


  // http://localhost:7001/cms/v1/files/image/8
  async GetImageId(id){
    let  returnData =  await _axios({
      url:`/api/v1/files/image/${id}`,
      method:'GET'
    });
    return returnData.data;
  }
}


export default new Files;
