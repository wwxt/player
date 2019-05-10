module.exports = {
	baseUrl: './',
	outputDir: "dist",
	lintOnSave: true,
	runtimeCompiler: false,
	productionSourceMap: false,
	chainWebpack: () => {},
	configureWebpack: () => {},
  configureWebpack: {
	devServer:{
		proxy: {
			"/api": {
				target: "http://baobab.kaiyanapp.com",
				pathRewrite: {"^/api" : ""},
				changeOrigin:true
		}
	}
  }
  
  }
}