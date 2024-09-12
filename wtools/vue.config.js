const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/wtools/' : '/',
  devServer: {
    allowedHosts: 'all', // 允许来自所有主机的连接
    client: {
      webSocketURL: 'wss://0.0.0.0:8080/ws', // 指定 WebSocket 的 wss 地址
    },
  }
})
