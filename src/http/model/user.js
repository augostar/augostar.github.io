import _axios from '/@/http/axios';

class User {


  async login(data) {
    let retdata = {};
    retdata = await _axios({
      url: '/cms/v1/admin/login',
      method: 'post',
      data

    });
    return {...retdata.data.data};
  }



  home() {

    return _axios({
      url: '/cms/v1/admin/role/100000',
      method: 'get'
      // xsrfCookieName: 'csrfToken' // default


    });
  }




}


export default new User;
