<template>
    <div>
        <!-- 修改密码 -->
        <h6 class="text-left text-info border-bottom pb-2 mt-5">修改密码</h6>
        <el-form :model="ruleForm"  status-icon ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm ">
            <!--  form-item 的 prop对应的就是校验规则   -->
            <el-form-item  label="原密码" prop="oldpass" >
                <el-input class="form-item" type="password" v-model="ruleForm.oldpass"></el-input>
            </el-form-item>

            <el-form-item  label="新密码" prop="pass">
                <el-input class="form-item" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item  label="确认密码" prop="checkPass">
                <el-input class="form-item" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "SafeCom",
        data(){

            /*
            * 回调函数，确认两次输入的密码正确
            * */
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return{
                ruleForm: {
                    oldpass: '',
                    pass: '',
                    checkPass:''
                },
                rules: {
                    oldpass: [
                        { required: true, message: '请输原密码', trigger: 'blur' },
                        { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输新密码', trigger: 'blur' },
                        { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
                    ],
                    checkPass: [
                        {required: true, message: '请再次输入新密码', trigger: 'blur'},
                        { validator: validatePass2, trigger: 'blur', }
                    ]
                }
            };
        },
        methods:{

            success() {
                this.$message({
                    message: '修改成功',
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
                            url:'/user/resetPass',
                            data:{
                                oldpass:this.ruleForm.oldpass,
                                pass:this.ruleForm.pass
                            }
                        }).then(function(res){
                            if (res.data.code == 200){
                                //修改成功
                                _this.success()
                                _this.ruleForm={}
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

        }
    }
</script>

<style scoped>

</style>