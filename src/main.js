import Vue from 'vue'
import App from './App'
import store from './store'
import * as filters from './filters'


// 注册loading
import YLoading from '@/components/page-loading/index.vue'
Vue.component('y-loading', YLoading)

Vue.config.productionTip = false
Vue.prototype.$store = store

//全局filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 初始化小程序版本更新代码
import updateManage from '@/lib/init/updateManage'

// 小程序Page方法扩展 onShareAppMessage
import pageExtend from '@/lib/extend/pageExtend'
Vue.mixin(pageExtend)

// Vue原型方法扩展
import vueProtoExtend from '@/lib/extend/vueProtoExtend'
Vue.use(vueProtoExtend)

App.mpType = 'app'

const app = new Vue({
    store,
  ...App
})
app.$mount()
