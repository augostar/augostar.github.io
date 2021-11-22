
import secret from './secret';

class Storage {


  SetLocalStorage(key, str) {
    let strtype = typeof str;
    let addstr = typeof str === 'string' ? str : strtype === 'object' ? JSON.stringify(str) : `error${  str}`;
    localStorage.setItem(key, secret.Encrypt(addstr));
  }

  GetLocalStorage(key) {
    return secret.Decrypt(localStorage.getItem(key));
  }


  SetSessionStorage(key, str) {
    let strtype = typeof str;
    let addstr = typeof str === 'string' ? str : strtype === 'object' ? JSON.stringify(str) : `error${  str}`;
    sessionStorage.setItem(key, secret.Encrypt(addstr));
  }



  GetSessionStorage(key) {
    try {
      return JSON.parse(secret.Decrypt(sessionStorage.getItem(key)));
    } catch (error) {
      return {
        error,
        fail: '失败'
      };
    }
  }

  RemoveSessionStorage(key){
    try {
      return sessionStorage.removeItem(key);
    } catch (error) {
      return error;
    }
  }

}

// const storage =  new Storage();
export default {
  setLocalStorage: new Storage().SetLocalStorage,
  getLocalStorage: new Storage().GetLocalStorage,
  setSessionStorage: new Storage().SetSessionStorage,
  getSessionStorage: new Storage().GetSessionStorage,
  removeSessionStorage: new Storage().RemoveSessionStorage

};