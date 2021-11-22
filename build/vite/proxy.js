

/* 配置代理 */

export function  createProxy(list){

  const ret= {};
  for (const [prefix, target] of list) {
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), '')
    };
  }
  return ret;
}