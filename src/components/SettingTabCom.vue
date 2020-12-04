<!--设置页的侧边栏-->
<template>
    <div>
        <el-row class="tac">
            <el-col :span="12">
                <h5>个人设置</h5>
                <el-menu
                        :default-active=activeIndex
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        @select="handleSelect">
                    <el-menu-item index="1">
                        <i class="el-icon-document"></i>
                        <span slot="title">个人资料</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">安全设置</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">账号管理</span>
                    </el-menu-item>
                </el-menu>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    export default {
        name: "SettingTabCom",
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
        },
        data(){
            return{
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
    }
</script>

<style scoped>

</style>