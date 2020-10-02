<template>
    <div class="nk-container">
        <!-- 头部 -->
        <Navbar active-index="4"></Navbar>

        <!-- 内容 -->
        <div class="main">
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <h6><b class="square"></b> 系统通知</h6>
                    </div>
                    <div class="col-4 text-right">
                        <button type="button" class="btn btn-secondary btn-sm" @click="back">返回</button>
                    </div>
                </div>

                <!-- 通知列表 -->
                <ul class="list-unstyled mt-4">
                    <li class="media pb-3 pt-3 mb-2" v-for="map in notices">
                        <el-avatar :src="uploadPath+map.fromUser.avatar" class="mr-4 rounded-circle user-header" alt="用户头像" ></el-avatar>
                        <div class="toast show d-lg-block" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <strong class="mr-auto" v-text="map.fromUser.username"></strong>
                                <small v-text="map.notice.createTime">2019-04-25 15:49:32</small>
                                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="toast-body">
								<span v-if="topic=='comment'">
									用户
									<i v-text="map.user.username"></i>
									评论了你的<b v-text="map.entityType==1?'帖子':'回复'">帖子</b>,
                                    <router-link class="text-primary" :to="{name:'PostDetail' , params:{pid:map.postId}}" >点击查看</router-link>
								</span>
                                <span v-if="topic=='like'">
									用户
									<i v-text="map.user.username">nowcoder</i>
									点赞了你的<b v-text="map.entityType==1?'帖子':'回复'">帖子</b>,
									<router-link class="text-primary" :to="{name:'PostDetail' , params:{pid:map.postId}}" >点击查看</router-link>
								</span>
                                <span v-if="topic=='follow'">
									用户
									<i v-text="map.user.username"></i>
									关注了你,
                                    <router-link class="text-primary" :to="{name:'Profile' , params:{uid:map.user.id}}" >点击查看</router-link>
								</span>
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
        name: "NoticeDetail",
        components:{
            Navbar
        },
        methods:{
            back(){
                this.$router.push('/notice');
            },
            page(currentPage) {
                const _this = this
                _this.$axios.get('/notice/detail/'+_this.topic +'?currentPage='+ currentPage).then(res => {
                    const myData = res.data.data;

                    _this.notices = myData.notices;
                    _this.total = myData.total;
                    _this.currentPage = myData.currentPage;
                })
            }
        },
        created: function () {
            const _this = this;
            _this.topic = _this.$route.params.topic
            //提交表单
            this.$axios({
                method: 'get',
                url: '/notice/detail/' + _this.topic
            }).then(function (res) {
                let myData = res.data.data;
                console.log(myData);
                _this.notices = myData.notices;
                _this.total = myData.total;
                _this.currentPage = myData.currentPage;

            }).catch(function (error) {
                console.log(error);
            });
        },
        data(){
            return{
                notices:'',
                currentPage:1,
                pageSize:5,
                total:0,
                uploadPath:this.$axios.defaults.baseURL,
                topic:''
            }
        }
    }
</script>

<style scoped>

</style>