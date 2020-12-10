<!--消息中心-->
<template>
    <div class="nk-container">
        <!-- 头部 -->
        <Navbar active-index="4"></Navbar>

        <div class="container">
            <div class="row h-100 " >
                <div class="col-3">
                    <!--侧边栏-->
                    <MessageTabCom active-index="1" @selecttab="changeActiveIndex"></MessageTabCom>
                </div>
                <div class="col-9">

                    <!--回复我的-->
                    <ReplyMe v-if="activeIndex == 1"></ReplyMe>
                    <!--点赞我的-->
                    <LikeMe v-if="activeIndex == 2"></LikeMe>
                    <!--关注我的-->
                    <FollowMe v-if="activeIndex == 3"></FollowMe>
                    <!--系统消息-->
                    <SystemMe v-if="activeIndex == 4"></SystemMe>
                    <!--聊天界面-->
                    <ChatMe v-if="activeIndex == 5"></ChatMe>


                </div>
            </div>

        </div>




    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    import MessageTabCom from "../components/MessageTabCom";
    import ReplyMe from "../components/msg/ReplyMe";
    import LikeMe from "../components/msg/LikeMe";
    import FollowMe from "../components/msg/FollowMe";
    import SystemMe from "../components/msg/SystemMe";
    import ChatMe from "../components/msg/ChatMe";
    export default {
        name: "Message",
        components:{
            Navbar,
            MessageTabCom,
            ReplyMe,
            LikeMe,
            FollowMe,
            SystemMe,
            ChatMe
        },
        data(){
            return{
                activeIndex: this.$store.state.msgActiveIndex
            }
        },
        created() {
            //在页面刷新时将vuex里的最新信息保存到sessionStorage里
            window.addEventListener("beforeunload",()=>{
                sessionStorage.setItem("state",JSON.stringify(this.$store.state))
            })
        },
        mounted() {
            //初始化数据(聊天的用户列表)
            this.$store.dispatch('initData');
            //创建链接(页面一加载就重新创建连接)
            this.$store.dispatch('connect');

        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            /*监听子组件的事件，改变侧边栏状态*/
            changeActiveIndex(key){
                this.activeIndex = key;
            }
        }
    }
</script>

<style scoped>

</style>