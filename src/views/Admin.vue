<template>
    <div>
        <Navbar></Navbar>
        <div>
            <el-button type="danger" round @click="clearEs">重置Es库</el-button>
            <br>

            <el-form  status-icon  ref="ruleForm1" label-width="100px" class="demo-ruleForm ">
                <el-form-item  label="用户ID"  >
                    <el-input class="form-item" v-model="uid" ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="deleteUser">删除用户</el-button>
                </el-form-item>
            </el-form>


            <el-form  status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm ">
                <el-form-item  label="用户ID" >
                    <el-input class="form-item" v-model="es_uid" ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="resetEs">重新录入ES</el-button>
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
                es_uid: '',
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
            clearEs(){
                const _this = this;
                this.$axios({
                    method:'post',
                    url:'/admin/clearEs',
                }).then(function(res){
                    if (res.data.code == 200){
                        _this.success('es库清空完成')
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

            },
            resetEs(){
                const _this = this
                _this.$axios.get('/admin/resetEs?uid='+_this.es_uid).then(res => {
                    if (res.data.code == 200){
                        _this.success(res.data.msg)
                    }else{
                        _this.fail(res.data.msg)
                    }
                }).catch(function(error){
                    console.log(error)
                });
                // //提交表单
                // this.$axios({
                //     method:'get',
                //     url:'/admin/resetEs?uid='+_this.es_uid,
                // }).then(function(res){
                //     if (res.data.code == 200){
                //         _this.success(res.data.msg)
                //     }else{
                //         _this.fail(res.data.msg)
                //     }
                // }).catch(function(error){
                //     console.log(error)
                // });
            }
        }
    }
</script>

<style scoped>

</style>