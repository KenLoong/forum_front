<template>
    <div class="nk-container">
        <!-- 头部 -->
        <div class="navbar">
            <el-menu :default-active="8" class="el-menu-demo myMenu" mode="horizontal" @select="handleSelect" >
                <el-menu-item @click="toKen">关于本站</el-menu-item>
                <el-menu-item index="2" @click="toIndex">最新</el-menu-item>
                <el-menu-item index="3" @click="toHot">最热</el-menu-item>
                <el-menu-item index="4" @click="toLetter">消息中心</el-menu-item>
                <el-menu-item >
                    <el-input class="border-radius" @keyup.enter="search" v-model="keyword"></el-input>
                    <el-button type="primary" @click="search"  icon="el-icon-search">搜索</el-button>
                </el-menu-item>


                <el-menu-item @click="login"  v-show ="!$store.state.isLogin" class="navInfo">登录</el-menu-item>
                <el-menu-item @click="register" v-show="!$store.state.isLogin" class="navInfo">注册</el-menu-item>

                <el-submenu v-show="$store.state.isLogin"  index="5" class="navInfo">
                    <template slot="title" >创建</template>
                    <el-menu-item index="5-2" @click="publish(1)">写文章</el-menu-item>
                </el-submenu>

                <el-submenu v-show="$store.state.isLogin"  index="6" class="navInfo">
                    <el-menu-item v-text="$store.state.userInfo.username"></el-menu-item>
                    <template slot="title" >
                        <el-avatar :size="50" :src="picturePath+$store.state.userInfo.avatar"></el-avatar>
                    </template>
                    <el-menu-item index="6-1" @click="toHome">我的主页</el-menu-item>
                    <el-menu-item index="6-2" @click="toSetting">设置</el-menu-item>
                    <el-menu-item index="6-2" @click="toCollect">我的收藏</el-menu-item>
                    <el-menu-item index="6-3" @click="toUserPost">我的文章</el-menu-item>
                    <el-menu-item index="6-4" @click="logout">退出登录</el-menu-item>
                </el-submenu>

            </el-menu>
            <div class="line"></div>

        </div>

        <!-- 内容 -->
        <div class="main">
            <div class="container">
                <h6><b class="square"></b> 相关帖子</h6>
                <!-- 帖子列表 -->
                <ul class="list-unstyled mt-4">
                    <li class="media pb-3 pt-3 mb-3 border-bottom"  v-for="map in posts" >
                        <router-link :to="{name: 'Profile' ,params: {uid : map.user.id}}">
                            <el-avatar  :src="uploadPath+map.user.avatar"></el-avatar>
                        </router-link>
                        <div class="media-body">
                            <h6 class="mt-0 mb-3">
                                <router-link :to="{name : 'PostDetail' , params: {pid:map.post.id}} " v-html="map.post.title">
                                </router-link>
                            </h6>
                            <div class="mb-3" v-html="map.post.content">
                            </div>
                            <div class="text-muted font-size-12">
                                <u class="mr-3" v-text="map.user.username"></u>
                                发布于 <b v-text="map.post.createTimeStr">2019-04-15 15:32:18</b>
                                <ul class="d-inline float-right">
                                    <li class="d-inline ml-2">赞 <i v-text="map.likeCount">11</i></li>
                                    <li class="d-inline ml-2">|</li>
                                    <li class="d-inline ml-2">回复 <i v-text="map.post.commentCount">7</i></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 分页 -->
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
        name: "Search",
        components:{
            Navbar
        },
        created() {

            const _this = this;

            _this.$axios.get("/search?currentPage="+_this.currentPage+"&keyword="+_this.$route.params.keyword).then(res => {
                const myData = res.data.data;
                _this.total = myData.total;
                _this.currentPage = myData.currentPage;
                _this.posts = myData.posts;
                _this.keyword = myData.keyword;

            })
        },
        data(){
            return{
                currentPage:1,
                pageSize:5,
                total:0,
                picturePath:'http://47.115.88.155',
                uploadPath:this.$axios.defaults.baseURL,
                posts:'',
                keyword:'',

                isLogin : this.$store.state.isLogin,
                activeIndex: '1',
                userInfo:this.$store.state.userInfo,


            }
        },
        methods:{
            page(currentPage){
                const _this = this
                _this.$axios.get("/search?currentPage="+currentPage+"&keyword="+_this.keyword).then(res => {
                    const myData = res.data.data;
                    console.log(myData)
                    _this.total = myData.total;
                    _this.currentPage = myData.currentPage;
                    _this.posts = myData.posts;
                    _this.keyword = myData.keyword;
                })
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            toLetter(){
                if (!this.$store.state.isLogin || this.$store.state.isLogin==''){
                    this.$message.error('要登录才能查看消息哦');
                    return;
                }
                this.$router.push('/letter')
            },
            login(){
                this.$router.push('/login')
            },
            register(){
                this.$router.push('/register')
            },
            logout(){
                this.$store.commit("logout");
            },
            //跳转至发表文章页面，传递参数tag
            publish(flag){
                if (flag == 0){
                    this.$router.push({
                        path :'/post/query',
                    });
                }else{
                    this.$router.push({
                        path :'/post/add',
                    });
                }

            },
            toIndex(){
                this.$router.push("/");
            },
            toHome(){
                const  _this = this;
                this.$router.push({
                    name :'Profile',
                    params:{
                        uid:_this.$store.state.userInfo.id
                    }
                });
            },
            search(){
                const _this = this;
                _this.$axios.get("/search?currentPage=1&keyword="+_this.keyword).then(res => {
                    const myData = res.data.data;
                    _this.total = myData.total;
                    _this.currentPage = myData.currentPage;
                    _this.posts = myData.posts;
                    _this.keyword = myData.keyword;
                })

            },
            toHot(){
                this.$router.push({
                    name :'Hot'
                });
            },
            toSetting(){
                this.$router.push('/setting')
            },
            toCollect(){
                const _this = this
                this.$router.push({
                    name: 'Collection',
                    params: {
                        uid:_this.$store.state.userInfo.id
                    }
                });
            },
            toUserPost(){
                const _this = this
                this.$router.push({
                    name: 'UserPosts',
                    params: {
                        uid:_this.$store.state.userInfo.id
                    }
                });
            },
            toKen(){
                this.$router.push('/ken')
            }
        }
    }
</script>

<style scoped>
    .navInfo{
        float: right;
        flex: auto;
    }
    .myMenu{
        width: 100%;
    }

    em{
        color: red;
    }
</style>