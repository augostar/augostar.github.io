
import { defineConfig } from 'vite';
import { createVitePlugins } from './build/vite/plugin';
import { resolve, join } from 'path';



// yamljs 文件解析器
import yaml from 'yamljs';



// eslint-disable-next-line no-unused-vars
export default defineConfig(({ command, mode }) => {

  /* node process 当前Node.js进程执行时的工作目录*/
  // eslint-disable-next-line no-undef
  const processCmd =process.cwd();

  // 读取  配置文件
  console.log( `当前启动项目环境 ${mode}`);
  var config = yaml.load(join(processCmd,`./build/config/${mode}.config.yml`));
  var dev_config = yaml.load(join(processCmd,'./build/config/development.config.yml'));
  console.log( `当前启动项目${config.title || dev_config}`);

  console.log(config,dev_config);


  let pathResolve = (dir) => {
    // eslint-disable-next-line no-undef
    return resolve(processCmd, '.', dir);
  }; 


  return {
    // 项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
    root: processCmd,
    base: config.basePath || dev_config.basePath,
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]

    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      proxy: [ config.proxy || dev_config.proxy ]
    },
    build: {
      outDir: config.outDir || dev_config.outDir, 
      assetsDir: 'assets',
      target: 'es2015',
      terserOptions: {
        compress: {
          /*  https://terser.org/docs/api-reference#minify-options */
          keep_infinity: true,
          drop_console: true
        }
      },
      brotliSize: false,

      /* 限制警告 默认 500kbs */
      // chunkSizeWarningLimit: 2000

      /* 启动css代码分割  */
      cssCodeSplit: true, 
      /*  构建后是否生成 source map 文件。 */
      sourcemap: false 
    },

    /* 插件 */
    plugins: createVitePlugins(),


    /* 用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。关于环境文件的更多信息，请参见 这里。  */
    // eslint-disable-next-line no-undef
    envDir: join(processCmd, '/build/environ'),

    /* 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中 */
    envPrefix: config.envPrefix||dev_config.envPrefix

    

  };

});
