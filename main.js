import Vue from 'vue'
import App from './App'
import axios from './components/xml-packaging/xml-packaging.js'
import store from './state/state.js'
import token_validity from './components/token_validity/token_validity.js'
// const router = new VueRouter()
// import Router from 'vue-router';
// router.beforeEach((to, from, next) => {
//   // ...
//   console.log('路由t交转');
// })
// 
Vue.prototype.$store = store;
// Vue.prototype.baseURL = 'https://db.topcdb.com';
Vue.prototype.detection_validity = token_validity.validity


Vue.config.productionTip = false
App.mpType = 'app'


var $http = new axios({
	// 默认 跟地址
	baseUrl: 'https://db.topcdb.com',
	// 请求头  默认空
	header: '',
	//  是否开启 请求拦截
	promise: true,
	// token  默认空 
	token: '',
	// 是否开启 解析 jsp 数据格式
	dataType: false,
	that: Vue.prototype
})

Vue.prototype.$http = $http;

const app = new Vue({
	store,
	...App
})
app.$mount()
