<template>
    <div>
        <navbar></navbar>
        <h3> 立即创建你的账户吧 </h3>
        <el-form :model="ruleForm"    status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!--  form-item 的 prop对应的就是校验规则   -->
            <el-form-item label="用户名" prop="username" >
                <el-input class="form-item" v-model="ruleForm.username" ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
                <el-input class="form-item" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
                <el-input class="form-item" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
                <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                    <el-option label="男" value=0></el-option>
                    <el-option label="女" value=1></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="email" label="邮箱">
                <el-input class="form-item" v-model="ruleForm.email"></el-input>
            </el-form-item>


            <el-form-item prop="seccode" label="验证码" class="inputbar">
                <el-input class="form-item vcode" v-model="ruleForm.seccode"></el-input>
                <el-button type="primary" @click="createCode" class="form-item vcode">{{checkCode}}</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click=test>测试</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "Register",
        components:{
            navbar : Navbar
        },
        mounted () {
            //初始化验证码
            this.createCode();
        },
        data() {

            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码!!!'));
                } else if (value.toLowerCase() !== this.checkCode.toLowerCase()) {
                    //刷新验证码
                    callback(new Error('验证码错误!'));
                } else {
                    callback();
                }
            };

            /*
            * 回调函数，确认两次输入的密码正确
            * */
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                checkCode:'',
                ruleForm: {
                    username: '',
                    pass: '',
                    checkPass: '',
                    gender: '',
                    email:'',
                    seccode:''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    seccode: [{ required: true, trigger: "blur", validator: validateCode }]
                }
            };
        },
        methods: {
            success() {
                this.$message({
                    message: '注册成功，已往您的邮箱处发送一封激活邮件，请点击链接激活您的账号',
                    type: 'success'
                });
            },
            fail(msg) {
                this.$message.error(msg);
            },
            createCode() {
                let code = "";
                const codeLength = 4; //验证码的长度
                const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
                for(let i = 0; i < codeLength; i++) { //循环操作
                    let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                    code += random[index]; //根据索引取得随机数加到code上
                }
                this.checkCode = code; //把code值赋给验证码
            },
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交表单
                        this.$axios({
                            method:'post',
                            url:'/user/register',
                            data:{
                                username:this.ruleForm.username,
                                password:this.ruleForm.pass,
                                gender:this.ruleForm.gender,
                                email:this.ruleForm.email
                            }
                        }).then(function(response){
                            if (response.data.code == 200){
                                _this.success()
                                _this.$router.push('/login')
                            }else{
                                _this.fail(response.data.msg)
                            }

                            console.log(response);
                        }).catch(function(error){
                            console.log(error);
                        });
                    } else {
                        console.log('请正确填完你的表单！！！');
                        return false;
                    }
                });
            },
            test(){
                this.$axios({
                    method:'post',
                    url:'/user/test',
                }).then(function(res){
                    //保存token
                    console.log(res.data.data);
                    console.log(res);
                }).catch(function(error){
                    console.log(error);
                });
            }
        }
    }
</script>
<style scoped>
    .vcode{
        flex: inherit;
    }
    .form-item{
        width: 300px;
    }
</style>
