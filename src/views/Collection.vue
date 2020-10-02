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
                            <router-link class="nav-link" :to="{name: 'UserPosts' ,params: {uid :user.id}}">{{user.username}}的文章</router-link>
                        </li>
                        <li class="nav-item " >
                            <a class="nav-link active " href="javascript:;">{{user.username}}的收藏</a>
                        </li>
                    </ul>
                </div>

                <ul class="list-unstyled">
                    <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-for=" postVo in  posts">

                        <el-card>

                            <h4>
                                <!--跳转到另一个组件，带参数-->
                                <!--:to="{name: 'BlogDetail', params: {blogId: post.id}}-->
                                <!--跳转到另一个组件，带参数-->
                                <router-link :to="{name : 'PostDetail' , params: {pid:postVo.post.id}} ">
                                    {{postVo.post.title}}
                                </router-link>
                                <span>收藏于{{postVo.collectTime}}</span>
                            </h4>

                            <div class="p_tag">
                                <el-tag v-show="postVo.post.type == 1" type="danger" effect="dark">置顶</el-tag>
                                <el-tag v-show="postVo.post.status == 1" type="''" effect="dark">精选</el-tag>
                                <span v-text="postVo.post.likeCount"></span>赞
                            </div>

                        </el-card>
                    </li>
                </ul>

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
        name: "Collection",
        components:{
            Navbar
        },
        created() {
            const _this = this;
            //要先登录才能关注或取消关注

            this.$axios({
                method:'get',
                url:'/collection/'+_this.$route.params.uid
            }).then(function(res){
                if (res.data.code == 200){
                    const myData = res.data.data;
                    console.log(myData)
                    _this.user = myData.user
                    _this.total = myData.total
                    _this.posts = myData.posts
                    _this.currentPage = myData.currentPage

                }else{
                    _this.fail(res.data.msg)
                }
                console.log(res);
            }).catch(function(error){
                console.log(error);
            });
        },
        data(){
            return{
                user:{},
                total:0,
                posts:{},
                currentPage:1,
                pageSize:5,

                uploadPath:this.$axios.defaults.baseURL
            }
        },
        methods:{
            fail(msg) {
                this.$message.error(msg);
            },
            page(currentPage) {
                const _this = this;
                //要先登录才能关注或取消关注

                this.$axios({
                    method:'get',
                    url:'/collection/'+_this.$route.params.uid+'?currentPage='+currentPage
                }).then(function(res){
                    if (res.data.code == 200){
                        const myData = res.data.data;
                        console.log(myData)
                        _this.posts = myData.posts
                        _this.currentPage = myData.currentPage

                    }else{
                        _this.fail(res.data.msg)
                    }
                    console.log(res);
                }).catch(function(error){
                    console.log(error);
                });
            },
        }
    }
</script>

<style scoped>

</style>