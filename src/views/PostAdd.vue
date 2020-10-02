<template>
    <div>
        <navbar></navbar>
        <h1>{{msg}}</h1>
        <div class="m-content">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>

                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" :rows="20"   v-model="ruleForm.content"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-upload
                            ref="upload"
                            :action="action"
                            :data="uploadData"
                            :headers="myHeader"
                            list-type="picture-card"
                            :limit="3"
                            :auto-upload="false"
                            :on-preview="handlePictureCardPreview"
                            :on-exceed="exceed"
                            :before-upload="beforeUpload"
                            :on-change="onChange"
                    >
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最多上传3张图片，且每张图片不超过2M</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>


                <el-form-item >
                    <el-button  type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button  @click="cancel">取消</el-button>
                </el-form-item>

            </el-form>



        </div>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "PostAdd",
        components:{
             navbar :Navbar
        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                uploadData:{
                    'pid':''
                },
                action:this.$axios.defaults.baseURL+'/post/upload',
                myHeader:{'Authorization':sessionStorage.getItem("JWT_TOKEN")},
                tag:this.$route.params.tag,
                msg:this.$route.params.tag == 0 ? '提问' : '写文章',
                ruleForm: {
                    title: '',
                    content: '',
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            success() {
                this.$message({
                    message: '发表成功',
                    type: 'success'
                });
            },
            fail(msg) {
                this.$message.error(msg);
            },
            //提交表单
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        //提交表单
                        this.$axios({
                            method:'post',
                            url:'/post/publish',
                            data:{
                                title:this.ruleForm.title,
                                content:this.ruleForm.content,
                                tag:0
                            }
                        }).then(function(res){
                            if (res.data.code == 200){
                                //发表成功，根据返回的pid来上传图片
                                console.log(res.data.data)
                                _this.uploadData.pid = res.data.data;
                                //上传文件
                                _this.submitUpload();
                                _this.success();
                                _this.cancel();
                            }else{
                                _this.fail(res.data.msg)
                            }
                            console.log(res);
                        }).catch(function(error){
                            console.log(error);
                        });
                    } else {
                        return false;
                    }
                });
            },
            //取消
            cancel(){
                this.$router.push('/');
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            exceed(files, fileList){
                this.$message.error("最多只能上传3张图片");
            },
            submitUpload(){
                console.log(this.$refs.upload);
                this.$refs.upload.submit();
            },
            beforeUpload(file){
                const isLt2M = (file.size / 1024 / 1024) < 2;

                console.log("验证图片是否超过2M")
                if (!isLt2M){
                    this.$message.error("图片大小不能超过2M！！！");
                    return false;
                }

                return isLt2M;
            },
            onChange(file, fileList){
                fileList = fileList.filter(f => this.isOver(f.size));
                console.log(fileList);
            },
            isOver(size){
               return size /1024 /1024 < 2;
            }


        }

    }
</script>

<style scoped>
    .m-content {
        text-align: center;
        margin-top: 20px;
    }

</style>