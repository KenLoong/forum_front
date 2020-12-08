import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//全局变量
const store= new Vuex.Store({
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
        userInfo:JSON.parse(sessionStorage.getItem("userInfo")) || {}, //当前登录对象
        isLogin: sessionStorage.getItem("isLogin") || false,        //当前登录状态
        ws:null,//websocket连接端点
        userList:{},//聊天用户列表
        currentUser:{}, //当前聊天对象
        sessions:{}    //聊天记录
    },
    mutations:{
        //弹出登录成功信息
        success(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },
        fail(msg) {
            this.$message.error(msg);
        },
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
            state.userInfo = {};
            state.ws.close();
        },
        setWebsocket(state){
            const token = window.sessionStorage.getItem('JWT_TOKEN');
            let url = "ws://localhost:8089/forum_server/chat/"+token;
            state.ws = new WebSocket(url);
        },
        setUserList(state,userList){
            sessionStorage.setItem("userList",userList);
            state.userList = userList;
            console.log("执行了用户列表")
        },
        //添加聊天记录到vuex中
        addMessage(state,msg){
            //获取浏览器内存中的聊天记录
            let message=state.sessions[state.userInfo.id+"_"+msg.to_id];
            if (!message){
                //创建保存消息记录的数组
                Vue.set(state.sessions,state.currentUser.username+"_"+msg.to,[]);
            }
            //把聊天记录放进数组中
            state.sessions[state.userInfo.id+"_"+msg.to].push({
                content:msg.content,
                time: msg.time,
                from_avatar: msg.from_avatar,
                to_avatar:msg.to_avatar,
                from_name:msg.from_name,
                to_name:msg.to_name,
                from_id:msg.from_id,
                to_id:msg.to_id
            })
        },
        //获取用户列表
        GET_USERS(state){
            const _this = this
            Vue.prototype.$axios.get("/message/getUsers").then(res => {
                if (res.data.code!=200){
                    _this.fail(res.data.msg);
                    return;
                }else {
                    const data = res.data.data;
                    state.userList = data.userList;
                }
            }).catch(function(error){
                console.log(error);
                _this.fail("网络故障,请检查网络是否正常")
            });
        },
        //获取私聊记录，若用户第一次点击，则需要向服务器请求聊天记录
        //否则，在vuex中获取
        getSession(state,current_id){
            //获取vuex中的聊天记录
            let message=state.sessions[state.userInfo.id+"_"+current_id];
            if (!message){
                //向服务器请求聊天记录
                //提交表单
                Vue.prototype.$axios({
                    method:'post',
                    url:'/message/getSession',
                    data:{
                        toId:current_id
                    }
                }).then(function(res){
                    if (res.data.code == 200){

                        const data = res.data.data;
                        console.log(data);
                        //创建保存消息记录的数组
                        Vue.set(state.sessions,state.userInfo.id+"_"+current_id,data.chatList);

                    }else{
                        _this.fail(res.data.msg)
                    }
                    console.log(res);
                }).catch(function(error){
                    console.log(error);
                });
            }
        }
    },
    actions:{
        //连接服务器的websocket
        connect(context){
            const token = window.sessionStorage.getItem('JWT_TOKEN');
            let url = "ws://localhost:8089/forum_server/chat/"+token;
            context.state.ws = new WebSocket(url);

            //接收到服务端推送的消息后触发
            context.state.ws.onmessage = function(evt) {
                //获取服务端推送过来的消息
                var dataStr = evt.data;
                //将dataStr 转换为json对象
                var message = JSON.parse(dataStr);

            }
        },
        initData(context){
            //获取用户列表
            context.commit('GET_USERS')
        }
    },
    modules:{},
})
export default store
