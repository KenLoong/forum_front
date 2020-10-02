<template>
    <div class="nk-container">
        <!-- 头部 -->
        <Navbar active-index="4"></Navbar>

        <!-- 内容 -->
        <div class="main">
            <div class="container">
                <div class="position-relative">

                    <el-menu
                            :default-active="activeIndex"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-menu-item index="1">
                            <li class="nav-item">
                                <a class="nav-link position-relative active">
                                    朋友私信<span class="badge badge-danger" v-text="letterUnreadCount" v-if="letterUnreadCount!=0">3</span>
                                </a>
                            </li>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <li class="nav-item">
                                <router-link class="nav-link position-relative" :to="{name:'Notice'}">系统通知
                                    <span class="badge badge-danger" v-text="noticeUnreadCount" v-if="noticeUnreadCount!=0">
                                    </span>
                                </router-link>
                            </li>
                        </el-menu-item>
                    </el-menu>
                    <!-- 选项 -->
<!--                    <ul class="nav nav-tabs mb-3">-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link position-relative active">-->
<!--                                朋友私信<span class="badge badge-danger" v-text="letterUnreadCount" v-if="letterUnreadCount!=0">3</span>-->
<!--                            </a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link position-relative" href="notice.html">系统通知-->
<!--                                <span class="badge badge-danger" v-text="noticeUnreadCount" v-if="noticeUnreadCount!=0"></span></a>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <el-button type="primary" @click="send">发私信</el-button>-->
<!--                        </li>-->
<!--                    </ul>-->

                </div>

                <!-- 私信列表 -->
                <ul class="list-unstyled">
                    <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-for="messageVo in  conversations" >
                        <span class="badge badge-danger" v-text="messageVo.unreadCount" v-if="messageVo.unreadCount!=0"></span>
                            <!--用户头像-->
                        <el-avatar :src="picturePath+messageVo.target.avatar" class="mr-4 rounded-circle user-header" alt="用户头像" ></el-avatar>
                        <div class="media-body">
                            <h6 class="mt-0 mb-3">
                                <!--用户名字-->
                                <span class="text-success" v-text="messageVo.target.username">闲人</span>
                                <!--发送时间-->
                                <span class="float-right text-muted font-size-12" v-text="messageVo.conversation.createTime"></span>
                            </h6>
                            <div>
                                <!--会话详情链接,内容是最新一条私信-->
                                <router-link :to="{name: 'LetterDetail', params: {cid: messageVo.conversation.conversationId}}" >
                                    {{messageVo.conversation.content}}
                                </router-link>
                                <ul class="d-inline font-size-12 float-right">
                                    <li class="d-inline ml-2"><a href="#" class="text-primary">共<i v-text="messageVo.letterCount">5</i>条会话</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>

                <!--分页，@current-change会把点击的页数传给方法-->
                <el-pagination class="mpage"
                               background
                               layout="prev, pager, next"
                               :current-page="currentPage"
                               :page-size="pageSize"
                               :total="total"
                               @current-change=page>
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "Letter",
        components:{
            Navbar
        },
        data(){
            return{
                //分页数据
                currentPage: 1,
                total: 0,
                pageSize: 5,
                letterUnreadCount:0,
                noticeUnreadCount:0,
                conversations:{},
                uploadPath:this.$axios.defaults.baseURL,
                picturePath:'http://47.115.88.155',
                activeIndex:"1"
            }
        },
        created() {
            const _this = this;
            //提交表单
            this.$axios({
                method:'get',
                url:'/letter/list',
            }).then(function(res){
                console.log(res)
                _this.letterUnreadCount = res.data.data.letterUnreadCount
                _this.noticeUnreadCount = res.data.data.noticeUnreadCount
                _this.conversations = res.data.data.records;

                //分页数据
                _this.currentPage = res.data.data.currentPage
                _this.total = res.data.data.total
            }).catch(function(error){
                console.log(error);
            });
        },
        methods:{
            //分页
            page(currentPage) {
                const _this = this;
                this.$axios({
                    method:'get',
                    url:'/letter/list?currentPage='+currentPage,
                }).then(function(res){

                    _this.letterUnreadCount = res.data.data.letterUnreadCount
                    _this.noticeUnreadCount = res.data.data.noticeUnreadCount
                    _this.conversations = res.data.data.records;

                    //分页数据
                    _this.currentPage = res.data.data.currentPage
                    _this.total = res.data.data.total

                    console.log(res);
                }).catch(function(error){
                    console.log(error);
                });
            },
            send(){
                this.$router.push({
                    name:"SendLetter",
                    params: {
                        toName:""
                    }
                });
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .mpage {
        margin: 0 auto;
        text-align: center;

    }
    .sendbt{
        float: right;
    }
</style>