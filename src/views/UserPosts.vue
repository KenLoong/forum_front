<template>
    <div  class="nk-container">
        <Navbar active-index="8"></Navbar>


            <!-- 内容 -->
        <div class="main">
            <div class="container">
                <!-- 选项 -->
                <div class="position-relative">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'Profile' ,params: {uid :user.id}}">{{user.username}}的主页</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="javascript:;">{{user.username}}的文章</a>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'Collection',params:{uid:user.id}}" >{{user.username}}的收藏</router-link>
                        </li>
                    </ul>
                </div>
                <!-- 文章列表 -->
                <div class="media mt-5">
                    <div class="media-body">
                        <ul class="list-unstyled">
                            <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-for="postVo in records">

                                <el-card>
                                    <h4>
                                        <!--跳转到另一个组件，带参数-->
                                        <!--:to="{name: 'BlogDetail', params: {blogId: post.id}}-->
                                        <!--跳转到另一个组件，带参数-->
                                        <router-link :to="{name : 'PostDetail' , params: {pid:postVo.post.id}} ">
                                            {{postVo.post.title}}
                                        </router-link>
                                        <span>发表于{{postVo.post.createTimeStr}}</span>
                                    </h4>

                                    <div class="p_tag">
                                        <el-tag v-show="postVo.post.type == 1" type="danger" effect="dark">置顶</el-tag>
                                        <el-tag v-show="postVo.post.status == 1" type="''" effect="dark">精选</el-tag>
                                        <span v-text="postVo.post.likeCount"></span>赞
                                    </div>
                                </el-card>

                            </li>
                        </ul>
                    </div>
                </div>

                <!--分页，@current-change会把点击的页数传给方法-->
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
        name: "UserPosts",
        components:{
            Navbar
        },
        data(){
            return{
                uploadPath:this.$axios.defaults.baseURL,
                records: {},
                currentPage: 1,
                total: 0,
                pageSize: 5,

                user:{},

            }
        },
        //頁面首先加載第一頁
        created() {
            const _this = this
            _this.$axios.get('/user/userPost/+'+_this.$route.params.uid).then(res => {
                console.log(res)
                _this.records = res.data.data.pagination.records
                _this.currentPage = res.data.data.pagination.currentPage
                _this.total = res.data.data.pagination.total
                _this.pageSize = res.data.data.pagination.pageSize
                _this.user = res.data.data.user

            })
        },
        methods:{
            page(currentPage) {
                const _this = this;
                //要先登录才能关注或取消关注

                this.$axios({
                    method:'get',
                    url:'/user/userPost/'+_this.$route.params.uid+'?currentPage='+currentPage
                }).then(function(res){
                    if (res.data.code == 200){
                        const myData = res.data.data;
                        console.log(myData)
                        _this.records = res.data.data.pagination.records
                        _this.currentPage = res.data.data.pagination.currentPage
                        _this.total = res.data.data.pagination.total
                        _this.pageSize = res.data.data.pagination.pageSize
                    }else{
                        _this.fail(res.data.msg)
                    }
                    console.log(res);
                }).catch(function(error){
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>