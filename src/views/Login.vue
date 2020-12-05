<template>
    <div>
        <!--头部-->
        <navbar ></navbar>

        <div class="mymain">
            <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
                <!--  form-item 的 prop对应的就是校验规则   -->
                <el-form-item  label="用户名" prop="username" >
                    <el-input class="form-item" v-model="ruleForm.username" ></el-input>
                </el-form-item>

                <el-form-item  label="密码" prop="pass">
                    <el-input class="form-item" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="seccode" label="验证码" class="inputbar">
                    <el-input class="form-item vcode" v-model="ruleForm.seccode"></el-input>
                    <el-button type="primary"  @click="createCode" class="form-item vcode">{{checkCode}}</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <router-link class="nav-link" :to="{name: 'Forget'}">忘记密码?</router-link>
                </el-form-item>


            </el-form>
        </div>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar.vue";
    export default {
        name: "Login",
        components:{
            navbar : Navbar
        },
        data() {
            const _this = this;

            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码!!!'));
                } else if (value.toLowerCase() !== this.checkCode.toLowerCase()) {
                    //刷新验证码
                    callback(new Error('验证码错误!'));
                    _this.createCode();
                } else {
                    callback();
                }
            };

            return {
                checkCode:'',
                ruleForm: {
                    username: '',
                    pass: '',
                    seccode: ''
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
                    seccode: [{ required: true, trigger: "blur", validator: validateCode }]
                }
            };
        },
        methods: {
            //弹出登录成功信息
            success() {
                this.$message({
                    message: '登录成功',
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
                            url:'/user/login',
                            data:{
                                username:this.ruleForm.username,
                                password:this.ruleForm.pass
                            }
                        }).then(function(res){
                            if (res.data.code == 200){
                                //登录成功
                                //保存token
                                const data = res.data.data;
                                console.log(data);

                                sessionStorage.setItem("JWT_TOKEN", data.token);
                                //请求用户信息
                                _this.getInfo(data.token);
                                //创建websocket连接
                                _this.$store.commit('setWebsocket');
                                //保存聊天用户列表
                                _this.$store.commit('setUserList',data.userList);
                                _this.success()
                                //跳转至首页
                                // _this.$router.push('/')
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
            getInfo(){
                const _this = this;
                this.$axios({
                    method:'post',
                    url:'/user/getInfo',
                }).then(function(res){
                    //保存用户信息
                    //保存用户
                    _this.$store.commit("setUserInfo", res.data.data);
                    _this.$store.commit("setLoginState",true);
                    console.log(res);
                }).catch(function(error){
                    console.log(error);
                });
            },

            //生成验证码
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
            test(){
                this.$axios({
                    method:'post',
                    url:'/user/test',
                }).then(function(res){
                    console.log(res);
                }).catch(function(error){
                    console.log(error);
                });
            }
        },
        mounted () {
            //初始化验证码
            this.createCode();
        }

    }
</script>
<style scoped>
    .vcode{
        flex: inherit;
        margin-left: 20px;
    }
    .form-item{
        width: 300px;
        float: left;
    flex: inherit;
    }
    .mymain{
        margin-left: 100px;
        margin-top: 50px;
    }
</style>
