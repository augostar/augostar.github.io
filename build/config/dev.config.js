export const devConfig = {
  
  base:'./',
  proxy:[
    
    // ['/cms','https://www.zhuoyuanai.cn/answer/cms']
    ['/cms','http://localhost:7001/cms']
    
    /*
     * 
     * ['/public','http://localhost:7001/public']
     */
     
    /*
     * ['/api', 'https://www.vegts.cn/cms'],
     * ['/public', 'https://47.108.72.247/public']
     */
  ],
  // 环境变量 名称 大写

  envPrefix:['VITE_','AUGO']
  
};