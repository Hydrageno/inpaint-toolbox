const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  devServer: {
    proxy: {
      ['/dev-api']: {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/dev-api']: ''
        }
      }
    }
  },
})
