// 引用AES源码js
import CryptoJS from 'crypto-js';
import config from '/@/config/secretkey';

class Secret {

  constructor() {
    this.key = CryptoJS.enc.Utf8.parse(config.key);
    this.iv = CryptoJS.enc.Utf8.parse(config.iv);
  }

  // 解密方法
  Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
  // 加密方法
  Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  }
  MD5(signStr){
    return  CryptoJS.MD5(signStr).toString();
  }
}

// let secret =  new Secret();
export default new Secret();