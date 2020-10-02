<template>
    <div>
        <Navbar></Navbar>
        <div>
            <el-button type="danger" round @click="resetEs">重置Es库</el-button>

            <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm ">
                <!--  form-item 的 prop对应的就是校验规则   -->
                <el-form-item  label="用户ID" prop="uid" >
                    <el-input class="form-item" v-model="uid" ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="deleteUser">删除用户</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "Admin",
        components:{
            Navbar
        },
        data() {
            return{
                uid: '',
            }
        },
        methods:{
            //弹出登录成功信息
            success(msg) {
                this.$message({
                    message: msg,
                    type: 'success'
                });
            },
            fail(msg) {
                this.$message.error(msg);
            },
            resetEs(){
                const _this = this;
                this.$axios({
                    method:'post',
                    url:'/admin/resetEs',
                }).then(function(res){
                    if (res.data.code == 200){
                        _this.success('重置成功')
                    }else{
                        _this.fail(res.data.msg)
                    }
                }).catch(function(error){
                    console.log(error);
                });
            },
            deleteUser(){
                const _this = this;
                //提交表单
                this.$axios({
                    method:'get',
                    url:'/admin/deleteUser?uid='+_this.uid,
                }).then(function(res){
                    if (res.data.code == 200){
                        _this.success('删除成功')
                    }else{
                        _this.fail(res.data.msg)
                    }
                }).catch(function(error){
                    console.log(error)
                });

            }
        }
    }
</script>

<style scoped>

</style>