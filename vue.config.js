const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/login': {
        // 要代理的服务器地址  这里不用写 api
        target: 'https://apipc-xiaotuxian-front.itheima.net',
        changeOrigin: true // 是否跨域
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false,
  // 消除vue i18n的警告
  chainWebpack: config => {
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
  }

})
