<template>
    <div class="nk-container">
        <!-- 头部 -->
        <Navbar></Navbar>

        <!-- 内容 -->
        <div class="main">
            <!-- 网站UV -->
            <div class="container pl-5 pr-5 pt-3 pb-3 mt-3">
                <h6 class="mt-3"><b class="square"></b> 网站 UV</h6>

                <el-form ref="uvform"  :model="uvform" label-width="80px">

                    <el-form-item label="活动时间" prop="start">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="uvform.uvStartDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11" prop="end">
                            <el-date-picker type="date" placeholder="选择日期" v-model="uvform.uvEndDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onUv">开始统计</el-button>
                    </el-form-item>
                </el-form>

                <ul class="list-group mt-3 mb-3">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        统计结果
                        <span class="badge badge-primary badge-danger font-size-14" v-text="uvResult">0</span>
                    </li>
                </ul>
            </div>
            <!-- 活跃用户 -->
            <div class="container pl-5 pr-5 pt-3 pb-3 mt-4">
                <h6 class="mt-3"><b class="square"></b> 活跃用户</h6>
                <el-form ref="dauform" :model="dauform" label-width="80px">
                    <el-form-item label="活动时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="dauform.dauStartDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="dauform.dauEndDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onDau">开始统计</el-button>
                    </el-form-item>
                </el-form>

                <ul class="list-group mt-3 mb-3">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        统计结果
                        <span class="badge badge-primary badge-danger font-size-14" v-text="dauResult">0</span>
                    </li>
                </ul>
            </div>
        </div>



    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "Data",
        components:{
            Navbar
        },
        methods:{
            fail(msg) {
                this.$message.error(msg);
            },

            onUv(){
                const _this = this;

                        //提交表单
                        this.$axios({
                            method:'post',
                            url:'/data/uv',
                            data:{
                                start:this.uvform.uvStartDate,
                                end:this.uvform.uvEndDate
                            }
                        }).then(function(res){
                            console.log(res)
                            if (res.data.code == 200){
                                _this.uvResult = res.data.data.uvResult
                            }else{
                                _this.fail(res.data.msg)
                            }

                        }).catch(function(error){
                            console.log(error);
                        });
            },
            onDau(){

                const _this = this;

                //提交表单
                this.$axios({
                    method:'post',
                    url:'/data/dau',
                    data:{
                        start:_this.dauform.dauStartDate,
                        end:_this.dauform.dauEndDate
                    }
                }).then(function(res){
                    console.log(res)
                    if (res.data.code == 200){
                        _this.dauResult = res.data.data.dauResult
                    }else{
                        _this.fail(res.data.msg)
                    }

                }).catch(function(error){
                    console.log(error);
                });

            }


        },
        data(){
            return{
                uvResult:'',
                uvStartDate:'',
                uvEndDate:'',
                dauResult:'',
                dauStartDate:'',
                dauEndDate:'',

                uvform: {
                    uvStartDate: '',
                    uvEndDate: '',
                },
                dauform: {
                    dauStartDate: '',
                    dauEndDate: '',
                },

            }
        }

    }
</script>

<style scoped>

</style>