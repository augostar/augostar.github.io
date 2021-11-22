import { defineStore } from 'pinia';

/*
 * useStore could be anything like useUser, useCart
 * the first argument is a unique id of the store across your application
 */
export const PageStore = defineStore('page', {
  // other options...
  state: () => ({
    spinning:{
      state:false,
      delay:1000,
      tip:'......',
      message:'正在加载中......',
      description:' 请稍等',
      type:'info'
    }
  }),
  getters: {
    
  },

  actions: {

  }

});