<template>
    <div>
        <div class="block plist">
            <el-timeline>
                <!--遍历博客-->
                <el-timeline-item :timestamp="msgVo.createTimeStr" placement="top" v-for="msgVo in msgVos">
                    <el-card>
                        <el-avatar :src=msgVo.fromUser.avatar></el-avatar>
                        <router-link :to="{name: 'Profile' ,params: {uid : msgVo.fromUser.id}}">
                            <span v-text="msgVo.fromUser.username"></span>
                        </router-link>
                        <router-link :to="{name : 'PostDetail' , params: {pid:msgVo.postId}} ">
                            <h4>点赞了你的<span v-text="msgVo.msgType == 1 ? '文章' : '评论'"></span>
                            </h4>
                        </router-link>

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
    export default {
        name: "LikeMe",
        data(){
            return{
                currentPage : 1,
                pageSize:5,
                msgVos:{},
                total:0
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
            page(currentPage) {
                const _this = this
                _this.$axios.get("/message/like?currentPage=" + currentPage).then(res => {
                    if (res.data.code!=200){
                        _this.fail(res.data.msg);
                        return;
                    }else {
                        const data = res.data.data;
                        _this.msgVos = data.msgVos;
                        _this.total = data.total;
                    }
                }).catch(function(error){
                    console.log(error);
                    _this.fail("网络故障")
                });
            }

        },
        created() {
            const _this = this;
            //提交表单
            this.$axios({
                method:'get',
                url:'/message/like',
            }).then(function(res){
                if (res.data.code!=200){
                    _this.fail(res.data.msg);
                    return;
                }else {
                    const data = res.data.data;
                    _this.msgVos = data.msgVos;
                    _this.total = data.total;

                }

            }).catch(function(error){
                console.log(error);
            });

        }
    }
</script>

<style scoped>

</style>