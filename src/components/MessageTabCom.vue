<template>
        <!--侧边栏-->
        <div>
                <h5>消息中心</h5>
                <el-menu
                        :default-active=activeIndex
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        @select="handleSelect">
                    <el-menu-item index="1">
                        <i class="el-icon-document"></i>
                        <span slot="title" class="">回复我的
                                <span class="badge badge-danger" v-text="replyCount" v-if="replyCount!=0"></span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">收到的赞
                            <span class="badge badge-danger" v-text="likeCount" v-if="likeCount!=0"></span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">新粉丝
                            <span class="badge badge-danger" v-text="followCount" v-if="followCount!=0"></span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-document"></i>
                        <span slot="title">系统通知
                            <span class="badge badge-danger" v-text="systemCount" v-if="systemCount!=0"></span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-document"></i>
                        <span slot="title">我的消息</span>
                    </el-menu-item>
                </el-menu>
        </div>
</template>

<script>
    export default {
        name: "MessageTabCom",
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                this.$emit('selecttab',key);
            },
            //弹出登录成功信息
            success(msg) {
                this.$message({
                    message: msg,
                    type: 'success'
                });
            },
            fail(msg) {
                this.$message.error(msg);
            }
        },
        data(){
            return{
                followCount:0,
                replyCount:0,
                likeCount:0,
                systemCount:0
            }
        },
        //组件参数
        props: {
            activeIndex: {
                type: String,
                default: '1',
                required: true //在使用组件一定传值
            }
        },
        created() {
            const _this = this;
            //提交表单
            this.$axios({
                method:'get',
                url:'/message/list',
            }).then(function(res){
                const result = res.data;
                if (result.code == 200){
                    const data = result.data;
                    _this.followCount = data.followCount
                    _this.replyCount = data.replyCount;
                    _this.likeCount = data.likeCount;
                    _this.systemCount = data.systemCount;

                }else{
                    _this.fail(result.msg);
                }


            }).catch(function(error){
                console.log(error);
            });

        },
    }
</script>

<style scoped>

</style>