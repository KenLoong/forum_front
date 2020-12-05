import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//全局变量
const store= new Vuex.Store({
    state: {
        userInfo:JSON.parse(sessionStorage.getItem("userInfo")) || {}, //当前登录对象
        isLogin: sessionStorage.getItem("isLogin") || false,        //当前登录状态
        ws:{},//websocket连接端点
        userList:sessionStorage.getItem("userList"),//聊天用户列表
        currentUser:{}, //当前聊天对象
        session:{}    //聊天记录
    },
    mutations:{
        //只有通过state的修改，vue才能实时监控到全局变量的变化！
        setUserInfo(state,userInfo){
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));//将传递的数据先保存到localStorage中
            state.userInfo = userInfo;// 之后才是修改state中的状态
        },
        setLoginState(state,flag){
            sessionStorage.setItem('isLogin',flag)
            state.isLogin = flag;
        },
        logout(state){
            sessionStorage.clear();
            state.isLogin = false;
            state.userInfo = {}
        },
        setWebsocket(state){
            state.ws = new WebSocket("ws://localhost:8089/chat");
        },
        setUserList(state,userList){
            sessionStorage.setItem("userList",userList);
            state.userList = userList;
            console.log("执行了用户列表")
        }
    },
    actions:{},
    modules:{},
})
export default store
