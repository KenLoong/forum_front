<template>
    <div>
        <Navbar active-index="3"></Navbar>

        <div class="block plist">
            <el-timeline>
                <!--遍历博客-->
                <el-timeline-item :timestamp="postVo.post.createTimeStr" placement="top" v-for="postVo in records">
                    <el-card>
                        <router-link :to="{name: 'Profile' ,params: {uid : postVo.user.id}}">
                            <el-avatar  :src=postVo.user.avatar></el-avatar>
                            <span v-text="postVo.user.username"></span>
                        </router-link>
                        <h4>
                            <!--跳转到另一个组件，带参数-->
                            <!--:to="{name: 'BlogDetail', params: {blogId: post.id}}-->
                            <!--跳转到另一个组件，带参数-->
                            <router-link :to="{name : 'PostDetail' , params: {pid:postVo.post.id}} ">
                                {{postVo.post.title}}
                            </router-link>
                        </h4>

                        <div class="p_tag">
                            <el-tag v-show="postVo.post.type == 1" type="danger" effect="dark">置顶</el-tag>
                            <el-tag v-show="postVo.post.status == 1" type="''" effect="dark">精选</el-tag>
                            <span v-text="postVo.post.likeCount"></span>赞
                        </div>
                        <p>{{postVo.post.content}}</p>


                    </el-card>

                </el-timeline-item>

            </el-timeline>

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

</template>


<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "Hot",
        components:{
            Navbar
        },
        data(){
            return{
                uploadPath:this.$axios.defaults.baseURL,
                picturePath:'http://47.115.88.155',
                records: {},
                currentPage: 1,
                total: 0,
                pageSize: 5
            }
        },
        methods:{
            page(currentPage) {
                const _this = this
                _this.$axios.get("/post/list?currentPage=" + currentPage+"&listMode=1").then(res => {
                    console.log(res)
                    _this.records = res.data.data.records
                    _this.currentPage = res.data.data.currentPage
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.pageSize

                })
            }
        },
        //頁面首先加載第一頁
        created() {
            const _this = this
            _this.$axios.get("/post/list?currentPage=1&listMode=1").then(res => {
                console.log(res)
                _this.records = res.data.data.records
                _this.currentPage = res.data.data.currentPage
                _this.total = res.data.data.total
                _this.pageSize = res.data.data.pageSize

            })
        }
    }
</script>

<style scoped>
    .mpage {
        margin: 0 auto;
        text-align: center;

    }
    .plist{
        margin-top: 10px;
    }
    .p_tag{
        float: right;
        margin-bottom: 10px;
    }
</style>