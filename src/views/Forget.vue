<template>
    <div>
        <!--头部-->
        <navbar active-index="0"></navbar>

        <h3>忘记密码</h3>
        <div class="mymain">
            <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
                <el-form-item prop="email" label="邮箱">
                    <el-input class="form-item" aria-placeholder="请输入注册邮箱地址" v-model="ruleForm.email"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>


            </el-form>
        </div>
    </div>

</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "Forget",
        components:{
            navbar : Navbar
        },
        data(){
            return{
                ruleForm: {
                    email:''
                },
                rules: {
                    email: [
                        { required: true, message: '请输入注册邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]
                }
            }
        },
        methods:{
            success() {
                this.$message({
                    message: '已往您的邮箱处发送一封邮件，里面有你的新密码',
                    type: 'success'
                });
            },
            fail(msg) {
                this.$message.error(msg);
            },
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交表单
                        this.$axios({
                            method:'post',
                            url:'/user/forget',
                            data:{
                                email:this.ruleForm.email
                            }
                        }).then(function(response){
                            if (response.data.code == 200){
                                _this.success();
                                _this.$router.push('/login')
                            }else{
                                _this.fail(response.data.msg)
                            }

                            console.log(response);
                        }).catch(function(error){
                            console.log(error);
                        });
                    } else {
                        console.log('请正确填写邮箱！！！');
                        return false;
                    }
                });
            },

        }
    }
</script>

<style scoped>
    .form-item{
        width: 300px;
    }
</style>