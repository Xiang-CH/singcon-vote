const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  devServer:{
    allowedHosts: [".ngrok-free.app", '.github.io', '.hkupootal.com']
  }
})
