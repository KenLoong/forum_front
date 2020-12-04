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
    export default {
        name: "Message",
        components:{
            Navbar,
            MessageTabCom,
            ReplyMe,
            LikeMe,
            FollowMe,
            SystemMe
        },
        data(){
            return{
                // activeIndex:"2",
                commentNotice:'',
                likeNotice:'',
                followNotice:'',
                letterUnreadCount:0,
                noticeUnreadCount:0,
                activeIndex:1
            }
        },
        created() {
            const _this = this;

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