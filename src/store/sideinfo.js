import { defineStore } from 'pinia';
import storage from '/@/utils/storage';

/*
 * useStore could be anything like useUser, useCart
 * the first argument is a unique id of the store across your application
 */
const SideStore = defineStore('side', {
  // other options...
  state: () => ({
    collapse: false,
    openkey: [],
    selectedKeys: []
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
    getCollapse() {
      return this.collapse;
    }

  },

  actions: {
    changeCollapse() {
      this.collapse = !this.collapse;
    },
    addOpenKey(key) {
      this.openkey.findIndex((item) => item.name === key.name) === -1 ? this.openkey.push(key) : '';
    },
    removeOpenKey(key) {
      let index = this.openkey.findIndex((item) => item.name === key);
      if (this.openkey.length >= 1) {
        this.openkey.splice(index, 1);
      }
    }


  }

});
SideStore().$subscribe((mutation, state) => {
  /*
   * import { MutationType } from 'pinia'
   * mutation.type; // 'direct' | 'patch object' | 'patch function'
   * same as cartStore.$id
   * mutation.storeId; // 'cart'
   * only available with mutation.type === 'patch object'
   * mutation.payload; // patch object passed to cartStore.$patch()
   * persist the whole state to the local storage whenever it changes
   */
  
  storage.setSessionStorage('side', state);
});


export { SideStore };
