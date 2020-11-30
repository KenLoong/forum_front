import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import './plugins/element.js'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(mavonEditor)

Vue.config.productionTip = false

//全局注册axios
Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://localhost:8089/forum_server'
// axios.defaults.baseURL = 'http://47.115.88.155:8089/forum_server'

/**
 *  axios请求拦截器,每次请求带上token
 */
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('JWT_TOKEN');
    return config;
}, error => {
    return Promise.reject(error)
});



/**
 * axios响应拦截器
 */
axios.interceptors.response.use(
    function (response) {
        const code = response.data.code
        if (code == 201 || code == 202 ) {
            //说明token错误或者token过期
            const msg = response.data.msg;
            alert(msg);
            return router.push("/login");
        // }else if (code == 301){
        //     const msg = response.data.msg;
        //     alert(msg);
        //     return router.push("/");
        }else if(code == 200){
            //更新未读消息数量
            return response;
        }else {
            return response;
        }
    },
    function (error) {
        return Promise.reject(error)
    }
)




new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
