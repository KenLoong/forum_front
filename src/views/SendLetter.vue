<template>
    <div>
        <Navbar active-index="4"></Navbar>

        <div class="title">
            <h3>发私信</h3>
        </div>
        <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  label-width="80px" >
            <el-form-item label="发给" prop="toName">
                <el-input style="width: 80%" v-model="toName"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input  type="textarea" :rows="3"
                            style="width: 80%" v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import Navbar from "../components/Navbar";

    export default {
        name: "SendLetter",
        components:{
            Navbar
        },
        data() {
            return {
                toName:'',
                labelPosition: 'right',
                ruleForm: {
                    content: '',
                },
                rules: {
                    content : [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                        { min: 1, max: 50, message: '内容长度不可为空或超过50个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods:{
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        if (_this.toName == '' || _this.toName.length < 3 || _this.toName.length > 20){
                            _this.$message.error('用户名不可为空且长度要在3到20之间');
                            return ;
                        }

                        //提交表单
                        this.$axios({
                            method:'post',
                            url:'/letter/send',
                            data:{
                                toName:_this.toName,
                                content:this.ruleForm.content
                            }
                        }).then(function(res){
                            if (res.data.code == 200){
                                //登录成功
                                //保存token
                                _this.success()
                                //返回消息中心
                                _this.$router.push('/letter')
                            }else{
                                _this.fail(res.data.msg)
                            }
                            console.log(res);
                        }).catch(function(error){
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //弹出登录成功信息
            success() {
                this.$message({
                    message: '发送成功',
                    type: 'success'
                });
            },
            fail(msg) {
                this.$message.error(msg);
            }
        },
        created() {
            if (this.$route.params.toName == '0'){
                this.toName = '';
            }else {
                this.toName = this.$route.params.toName;
            }
        }

    }
</script>

<style scoped>
    .title{
        margin-top: 20px;
        margin-left: 50px;
        margin-bottom: 50px;
    }
</style>