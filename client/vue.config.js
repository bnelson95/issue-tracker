module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000'
        }
      }
    }
  }
}
