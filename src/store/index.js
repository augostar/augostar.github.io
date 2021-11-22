import { SideStore } from '/@/store/sideinfo';
/*
 * 官方文档
 * 
 * https://pinia.esm.dev/introduction.html
 */



// 改变的时候 将其存储 
SideStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type; // 'direct' | 'patch object' | 'patch function'
  // same as cartStore.$id
  mutation.storeId; // 'cart'
  // only available with mutation.type === 'patch object'
  mutation.payload; // patch object passed to cartStore.$patch()

  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('cart', JSON.stringify(state));
});


// 页面加载的时候将其写入 
