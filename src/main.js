import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video
Vue.prototype.axios=axios
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
import { Button ,Row,Col,Icon,Tabs,Checkbox} from 'element-ui';
Vue.component(Button.name, Button);
Vue.use(Row).use(Col).use(Icon).use(Tabs).use(Checkbox);


new Vue({
	router,
	el:"#app",
  render: h => h(App),
}).$mount('#app')
