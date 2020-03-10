import Vue from 'vue'
import App from './App'

import 'colorui/main.css'
import 'colorui/icon.css'

import uniRate from '@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue'
Vue.component('uniRate',uniRate)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
