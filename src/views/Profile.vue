<template>
    <div class="nk-container">
        <!-- 头部 -->
        <Navbar active-index="8"></Navbar>


        <!-- 内容 -->
        <div class="main">
            <div class="container">
                <!-- 选项 -->
                <div class="position-relative">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">个人信息</a>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'UserPosts' ,params: {uid :user.id}}">{{user.username}}的文章</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'Collection',params:{uid:user.id}}" >{{user.username}}的收藏</router-link>
                        </li>
                    </ul>
                </div>
                <!-- 个人信息 -->
                <div class="media mt-5">
                    <el-avatar  :src="user.avatar"></el-avatar>
<!--                    <img src="http://images.nowcoder.com/head/1t.png" class="align-self-start mr-4 rounded-circle" alt="用户头像" style="width:50px;">-->
                    <div class="media-body">
                        <h5 class="mt-0 text-warning">
                            <!--用户名-->
                            <span v-text="user.username"></span>
                            <!--关注按钮-->
                            <button type="button" v-if="!isMine" @click="follow(user.id)" class="btn btn-info btn-sm float-right mr-5 follow-btn" v-text="hasFollowed?'取消关注':'关注TA'">关注TA</button>
                            <!--私聊按钮-->
                            <button type="button" v-if="!isMine" @click="chat(user)" class="btn btn-info btn-sm float-right mr-5 follow-btn">发消息</button>
                        </h5>
                        <div class="text-muted mt-3">
                            <span>注册于 <i class="text-muted" v-text="user.createTime">2015-06-12 15:20:12</i></span>
                        </div>
                        <div class="text-muted mt-3 mb-5">
                            <span>关注了
                                <router-link class="text-primary" v-text="followeeCount"
                                             :to="{name:'Followees',params:{userId:user.id}}">
                                </router-link>
                            人</span>
                            <span class="ml-4">粉丝数量：
                                <router-link class="text-primary" v-text="followerCount"
                                :to="{name:'Followers',params:{userId:user.id}}"></router-link>
                                 人
                            </span>
                            <span class="ml-4">获得了 <i class="text-danger" v-text="likeCount"></i> 个赞</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

<!--        <div class="">-->

<!--            <el-card class="myFlex">-->
<!--                <div>-->
<!--                    <h3>头像</h3>-->
<!--                    <el-image :src="avatarPath+userInfo.avatar" class="myAvatar">-->
<!--                        <div slot="placeholder" class="image-slot">-->
<!--                            加载中<span class="dot">...</span>-->
<!--                        </div>-->
<!--                    </el-image>-->
<!--                    <el-upload-->
<!--                            ref="upload"-->
<!--                            class="upload-demo"-->
<!--                            :action="avatarAction"-->
<!--                            :headers="myHeader"-->
<!--                            accept=".jpg,.jpeg,.JPG,.JPEG,.PNG,.png"-->
<!--                            :on-success="uploadSuccess"-->
<!--                            :before-upload="beforeUplaod"-->
<!--                            multiple-->
<!--                            :limit="1"-->
<!--                            :on-exceed="handleExceed"-->
<!--                            list-type="picture"-->
<!--                    >-->
<!--                        <el-button size="small" type="success">修改头像</el-button>-->
<!--                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>-->
<!--                    </el-upload>-->
<!--                </div>-->
<!--            </el-card>-->
<!--            <el-card>-->
<!--                用户名：-->
<!--                <span v-text="userInfo.username"></span><br>-->
<!--            </el-card>-->
<!--            <el-card>-->
<!--                性别：-->
<!--                <span v-text="userInfo.gender == 0 ? '男' : '女'"></span>-->
<!--            </el-card>-->
<!--            <el-card>-->
<!--                注册时间：-->
<!--                <span v-text="userInfo.createTime"></span>-->
<!--            </el-card>-->


<!--        </div>-->




</template>


<script>
    import UserNavbar from "../components/UserNavbar";
    import Navbar from "../components/Navbar";


    export default {
        name: "UserHome",
        components:{
            UserNavbar,
            Navbar
        },
        created() {
            //请求用户主页信息
            const _this = this;
            console.log(this.$route.params.uid)
            //请求页面资源
            this.$axios({
                method:'get',
                url:'/user/profile/'+this.$route.params.uid,
            }).then(function(res){
                if (res.data.code == 200){
                    const myData = res.data.data;
                    console.log(myData)
                    _this.user = myData.user
                    _this.isMine = myData.isMine
                    _this.likeCount = myData.likeCount
                    _this.user.avatar = _this.user.avatar
                    _this.followeeCount = myData.followeeCount
                    _this.followerCount = myData.followerCount
                    _this.hasFollowed = myData.hasFollowed

                }else{
                    _this.fail(res.data.msg)
                }
                console.log(res);
            }).catch(function(error){
                console.log(error);
            });

        },
        methods:{
            fail(msg) {
                this.$message.error(msg);
            },
            handleExceed(file,fileList){
                this.$message.error("只能上传一张图片")
            },
            uploadSuccess(response, file, fileList){
                console.log(response);
                this.userInfo.avatar = response.msg;
                //更新用户个人信息
                this.$store.commit("setUserInfo", this.userInfo);
                //清除文件上传列表
                //this.$refs['upload'].clearFiles();
            },
            beforeUplaod(file){
                const isLt1M = file.size / 1024 / 1024 < 1 ;
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                }
                return isLt1M;
            },
            follow(entityId){
                const _this = this;
                //要先登录才能关注或取消关注
                if (!this.$store.state.isLogin || this.$store.state.isLogin==''){
                    this.$message.error('要登录才能关注哦');
                    return;
                }
                let path = '';
                if (_this.hasFollowed){
                    path = '/unfollow'
                }else {
                    path = '/follow'
                }
                this.$axios({
                    method:'post',
                    url:path,
                    data:{
                        entityType:3,
                        entityId:entityId
                    }
                }).then(function(res){
                    if (res.data.code == 200){
                        const myData = res.data.data;
                        console.log(myData)
                        _this.followerCount = myData.followerCount
                        _this.hasFollowed = myData.hasFollowed

                    }else{
                        _this.fail(res.data.msg)
                    }
                    console.log(res);
                }).catch(function(error){
                    console.log(error);
                });
            },
            chat(user){
                const _this = this;
                //要先登录才能关注或取消关注
                if (!this.$store.state.isLogin || this.$store.state.isLogin==''){
                    this.$message.error('要登录才能发消息哦');
                    return;
                }
                //设置消息页面的侧边栏索引
                _this.$store.commit('setMsgActiveIndex',5)
                //获取与对方的私聊记录
                this.$store.commit('getSession',user.id)
                //选中与对方聊天
                this.$store.commit('setCurrentUser',user)
                //跳转至聊天页面
                _this.$router.push('/message')


            }

        },
        data(){
            return{
                //头像网络资源地址
                uploadPath:this.$axios.defaults.baseURL,
                user:'',
                isMine:false,
                likeCount:'',

                hasFollowed:false,
                followeeCount:0,
                followerCount:0,

                //头像上传地址
                avatarAction: this.$axios.defaults.baseURL+'/user/avatar',
                myHeader:{'Authorization':sessionStorage.getItem("JWT_TOKEN")}
            }
        }

    }
</script>

<style scoped>

    .myFlex{
        height: 400px;
    }
    .myAvatar{
        width: 200px;
        height: 200px;
    }
    .myBtn{
        margin-left: 10px;
        margin-top: 10px;
    }
</style>