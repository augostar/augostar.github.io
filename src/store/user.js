import { defineStore } from 'pinia';



/*
 * useStore could be anything like useUser, useCart
 * the first argument is a unique id of the store across your application
 */
export const AdminStore = defineStore('admin', {
  // other options...
  state: () => ({
    name: '',
    nickName: '',
    id: 0,
    token:'',
    portrait:''
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },

  actions: {

  }

});