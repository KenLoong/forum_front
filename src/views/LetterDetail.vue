<template>
    <div class="nk-container">
        <!-- 头部 -->
        <Navbar active-index="4"></Navbar>

        <!-- 内容 -->
        <div class="main">
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <h6><b class="square"></b> 来自 <i class="text-success" v-text="target.username"></i> 的私信</h6>
                    </div>
                    <div class="col-4 text-right">
                        <button type="button" class="btn btn-secondary btn-sm" @click="back">返回</button>
                        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" @click="send">给TA私信</button>
                    </div>
                </div>

                <!-- 私信列表 -->
                <ul class="list-unstyled mt-4">
                    <li class="media pb-3 pt-3 mb-2"  v-for="letterVo in  letters" >

                        <el-avatar :src="uploadPath+letterVo.fromUser.avatar" class="mr-4 rounded-circle user-header" alt="用户头像" ></el-avatar>

                        <div class="toast show d-lg-block" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <strong class="mr-auto" v-text="letterVo.fromUser.username"></strong>
                                <small v-text="letterVo.letter.createTime">2020-8-25 15:49:32</small>
                                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="toast-body" v-text="letterVo.letter.content">
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 分页 -->
                <el-pagination class="mpage"
                               background
                               layout="prev, pager, next"
                               :current-page="currentPage"
                               :page-size="pageSize"
                               :total="total"
                               @current-change=page>
                </el-pagination>
            </div>
        </div>

    </div>
    
</template>

<script>
    import Navbar from "../components/Navbar";

    export default {
        name: "LetterDetail",
        components:{
            Navbar
        },
        created() {
            const _this = this;
            //提交表单
            this.$axios({
                method:'get',
                url:'/letter/detail/'+this.$route.params.cid,
            }).then(function(res){
                _this.letters = res.data.data.records
                _this.target = res.data.data.target
                //分页数据
                _this.currentPage = res.data.data.currentPage
                _this.total = res.data.data.total
                console.log(res);
            }).catch(function(error){
                console.log(error);
            });
        },
        data(){
            return{
                //分页数据
                currentPage: 1,
                total: 0,
                pageSize: 3,

                target:{},
                letters:{},
                uploadPath:this.$axios.defaults.baseURL
            }
        },
        methods:{
            //分页
            page(currentPage) {
                const _this = this;
                this.$axios({
                    method:'get',
                    url:'/letter/detail/'+this.$route.params.cid+'?currentPage='+currentPage,
                }).then(function(res){
                    _this.letters = res.data.data.records


                    _this.target = res.data.data.target
                    //分页数据
                    _this.currentPage = res.data.data.currentPage
                    _this.total = res.data.data.total

                    console.log(res);
                }).catch(function(error){
                    console.log(error);
                });
            },
            back(){
                this.$router.go(-1)
            },
            send(){
                const _this = this
                this.$router.push({
                    name:"SendLetter",
                    params: {
                        toName:_this.target.username
                    }
                });
            }
        }
    }
</script>

<style scoped>

    .mpage {
        margin: 0 auto;
        text-align: center;

    }
</style>