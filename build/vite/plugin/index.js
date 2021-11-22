import vue from '@vitejs/plugin-vue';

// 
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';

import styleImport from 'vite-plugin-style-import';

export function createVitePlugins() {

  let plugin = [vue()];



  // 按需引入 

  plugin.push(ViteComponents({
    customComponentResolvers: [AntDesignVueResolver()]

  }));




  plugin.push( styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index.js`;
        }
      }
    ]
  }));




  return plugin;

}