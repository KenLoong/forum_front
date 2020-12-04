<!--消息中心-->
<template>
    <div class="nk-container">
        <!-- 头部 -->
        <Navbar active-index="4"></Navbar>

        <div class="container">
            <div class="row" >
                <div class="col-4">
                    <!--侧边栏-->
                    <MessageTabCom active-index="1" @selecttab="changeActiveIndex"></MessageTabCom>
                </div>

                <div class="col-8">

                </div>
            </div>

        </div>

        <!-- 内容 -->
        <div class="main">
            <div class="container">
                <div class="position-relative">
                    <!-- 选项 -->
                    <el-menu
                            :default-active="2"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-menu-item index="1">
                            <li class="nav-item">
                                <router-link class="nav-link position-relative" :to="{name:'Letter'}">朋友私信
                                    <span class="badge badge-danger" v-text="noticeUnreadCount" v-if="noticeUnreadCount!=0">
                                    </span>
                                </router-link>
                            </li>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <li class="nav-item">
                                <a class="nav-link position-relative" :to="{name:'Notice'}">系统通知
                                    <span class="badge badge-danger" v-text="noticeUnreadCount" v-if="noticeUnreadCount!=0">
                                    </span>
                                </a>
                            </li>
                        </el-menu-item>
                    </el-menu>
                </div>

                <!-- 通知列表 -->
                <ul class="list-unstyled">
                    <!--评论类通知-->
                    <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-if="commentNotice.message!=null">
                        <span class="badge badge-danger" v-text="commentNotice.unread!=0?commentNotice.unread:''">3</span>
                        <img src="http://static.nowcoder.com/images/head/reply.png" class="mr-4 user-header" alt="通知图标">
                        <div class="media-body">
                            <h6 class="mt-0 mb-3">
                                <span>评论</span>
                                <span class="float-right text-muted font-size-12"
                                      v-text="commentNotice.message.createTime">2019-04-28 14:13:25</span>
                            </h6>
                            <div>
                                <!--跳转到评论通知列表-->
                                <router-link :to="{name:'NoticeDetail',params:{topic:'comment'}}">
                                    用户
                                    <i v-text="commentNotice.user.username">nowcoder</i>
                                    评论了你的<b v-text="commentNotice.entityType==1?'帖子':'回复'">帖子</b> ...
                                </router-link>
                                <ul class="d-inline font-size-12 float-right">
                                    <li class="d-inline ml-2"><span class="text-primary">共 <i v-text="commentNotice.count">3</i> 条会话</span></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <!--点赞类通知-->
                    <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-if="likeNotice.message!=null">
                        <span class="badge badge-danger" v-text="likeNotice.unread!=0?likeNotice.unread:''">3</span>
                        <img src="http://static.nowcoder.com/images/head/like.png" class="mr-4 user-header" alt="通知图标">
                        <div class="media-body">
                            <h6 class="mt-0 mb-3">
                                <span>赞</span>
                                <span class="float-right text-muted font-size-12"
                                      v-text="likeNotice.message.createTime">2019-04-28 14:13:25</span>
                            </h6>
                            <div>
                                <router-link :to="{name:'NoticeDetail',params:{topic:'like'}}">
                                    用户
                                    <i v-text="likeNotice.user.username"></i>
                                    点赞了你的<b v-text="likeNotice.entityType==1?'帖子':'回复'">帖子</b> ...
                                </router-link>
                                <ul class="d-inline font-size-12 float-right">
                                    <li class="d-inline ml-2"><span class="text-primary">共 <i v-text="likeNotice.count">3</i> 条会话</span></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <!--关注类通知-->
                    <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-if="followNotice.message!=null">
                        <span class="badge badge-danger" v-text="followNotice.unread!=0?followNotice.unread:''">3</span>
                        <img src="http://static.nowcoder.com/images/head/follow.png" class="mr-4 user-header" alt="通知图标">
                        <div class="media-body">
                            <h6 class="mt-0 mb-3">
                                <span>关注</span>
                                <span class="float-right text-muted font-size-12"
                                      v-text="followNotice.message.createTime">2019-04-28 14:13:25</span>
                            </h6>
                            <div>
                                <router-link :to="{name:'NoticeDetail',params:{topic:'follow'}}">
                                    用户
                                    <i v-text="followNotice.user.username">nowcoder</i>
                                    关注了你 ...
                                </router-link>
                                <ul class="d-inline font-size-12 float-right">
                                    <li class="d-inline ml-2"><span class="text-primary">共 <i v-text="followNotice.count">3</i> 条会话</span></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    import MessageTabCom from "../components/MessageTabCom";
    export default {
        name: "Notice",
        components:{
            Navbar,
            MessageTabCom
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
            //提交表单
            this.$axios({
                method:'get',
                url:'/notice/list',
            }).then(function(res){
                console.log(res)
                _this.letterUnreadCount = res.data.data.letterUnreadCount
                _this.noticeUnreadCount = res.data.data.noticeUnreadCount
                _this.commentNotice = res.data.data.commentNotice;
                _this.likeNotice = res.data.data.likeNotice;
                _this.followNotice = res.data.data.followNotice;

            }).catch(function(error){
                console.log(error);
            });

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