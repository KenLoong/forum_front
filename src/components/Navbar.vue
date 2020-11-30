<template>
    <div class="navbar">
        <el-menu :default-active="activeIndex" class="el-menu-demo myMenu" mode="horizontal" @select="handleSelect" >
            <el-menu-item index="0" @click="toKen">
                关于本站</el-menu-item>
<!--            <el-menu-item index="1">首页</el-menu-item>-->
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

            <!--头像-->
            <el-submenu v-show="$store.state.isLogin"  index="6" class="navInfo">
                <el-menu-item v-text="$store.state.userInfo.username"></el-menu-item>
                <template slot="title" >
                    <el-avatar :size="50" :src="$store.state.userInfo.avatar"></el-avatar>
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
</template>

<script>
    export default {
        name: 'Navbar',
        props: {
            activeIndex: {
                type: String,
                default: '2',
                required: false //在使用组件不一定传值
            }
        },
        created() {
        },
        data() {
            return {
                picturePath:'http://localhost:8089',
                // picturePath:'http://47.115.88.155',
                uploadPath:this.$axios.defaults.baseURL,
                isLogin : this.$store.state.isLogin,
                // activeIndex: '2',
                userInfo:this.$store.state.userInfo,
                keyword:''
            };
        },
        methods: {
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
            toHot(){
                this.$router.push({
                    name :'Hot'
                });
            },
            search(){
                const  _this = this;

                    this.$router.push({
                        name: 'Search',
                        params: {
                            keyword:_this.keyword
                        }
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
</style>