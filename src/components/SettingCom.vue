<template>
    <div>
        <el-card>
            <div>

                <!--<el-upload
                        class="avatar-uploader"
                        :action="avatarAction"
                        :headers="myHeader"
                        accept=".jpg,.jpeg,.JPG,.JPEG,.PNG,.png"
                        :show-file-list="false"
                        :on-success="uploadSuccess"
                        :before-upload="beforeUplaod"
                >
                    <el-image :src="userInfo.avatar" class="myAvatar">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                    </el-image>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                </el-upload>-->



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
                        :show-file-list="false"
                        :on-exceed="handleExceed"
                        list-type="picture"
                >
                    <el-button size="small" type="success">修改头像</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                </el-upload>
            </div>
        </el-card>
        <el-card >
            用户名：
            <span v-text="userInfo.username"></span><br>
        </el-card>
        <el-card >
            性别：
            <span v-text="userInfo.gender == 0 ? '男' : '女'"></span>
        </el-card>
        <el-card >
            注册时间：
            <span v-text="userInfo.createTime"></span>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "SettingCom",
        created() {
            const _this = this
            //请求页面资源
            this.$axios({
                method:'get',
                url:'/user/getInfo'
            }).then(function(res){
                if (res.data.code == 200){
                    _this.userInfo = _this.$store.state.userInfo;
                }else{
                    _this.fail(res.data.msg);
                    _this.router.push('/login')
                }

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
                //强制页面重新渲染
                this.$forceUpdate();
            },
            beforeUplaod(file){
                const isLt1M = file.size / 1024 / 1024 < 1 ;
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                }
                return isLt1M;
            }
        },
        data(){
            return{
                //头像网络资源地址
                uploadPath:this.$axios.defaults.baseURL,
                // picturePath:'http://47.115.88.155',
                userInfo:{},
                isMine:false,
                likeCount:'',

                //头像上传地址
                avatarAction: this.$axios.defaults.baseURL+'/user/avatar',
                myHeader:{'Authorization':sessionStorage.getItem("JWT_TOKEN")}
            }
        },

    }
</script>

<style scoped>
    .myAvatar{
        width: 200px;
        height: 200px;
    }

     .avatar-uploader .el-upload {
         border: 1px dashed #d9d9d9;
         border-radius: 6px;
         cursor: pointer;
         position: relative;
         overflow: hidden;
     }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>