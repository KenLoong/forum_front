<template>
    <div class="nk-container">
        <Navbar active-index="8"></Navbar>


        <!-- 内容 -->
        <div class="main">
            <el-card class="myFlex">
                <div>
                    <h3>头像</h3>
                    <el-image :src="userInfo.avatar" class="myAvatar">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                    <el-upload
                            ref="upload"
                            class="upload-demo"
                            :action="avatarAction"
                            :headers="myHeader"
                            accept=".jpg,.jpeg,.JPG,.JPEG,.PNG,.png"
                            :on-success="uploadSuccess"
                            :before-upload="beforeUplaod"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            list-type="picture"
                    >
                        <el-button size="small" type="success">修改头像</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                    </el-upload>
                </div>
            </el-card>
            <el-card>
                用户名：
                <span v-text="userInfo.username"></span><br>
            </el-card>
            <el-card>
                性别：
                <span v-text="userInfo.gender == 0 ? '男' : '女'"></span>
            </el-card>
            <el-card>
                注册时间：
                <span v-text="userInfo.createTime"></span>
            </el-card>
        </div>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "Setting",
        components: {Navbar},
        data(){
            return{
                //头像网络资源地址
                uploadPath:this.$axios.defaults.baseURL,
                // picturePath:'http://47.115.88.155',
                userInfo:'',
                isMine:false,
                likeCount:'',

                //头像上传地址
                avatarAction: this.$axios.defaults.baseURL+'/user/avatar',
                myHeader:{'Authorization':sessionStorage.getItem("JWT_TOKEN")}
            }
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
        },
        created() {
            const _this = this
            //请求页面资源
            this.$axios({
                method:'get',
                url:'/user/getInfo'
            }).then(function(res){

                if (res.data.code == 200){
                    _this.userInfo = res.data.data;

                }else{
                    _this.fail(res.data.msg)
                }

            }).catch(function(error){
                console.log(error);
            });
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