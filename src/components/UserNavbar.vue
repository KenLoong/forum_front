<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1">我的主页</el-menu-item>
            <el-menu-item index="2">我的文章</el-menu-item>
            <el-menu-item index="3">我的提问</el-menu-item>
            <el-menu-item index="4">我的关注</el-menu-item>
            <el-menu-item index="5">我的粉丝</el-menu-item>
            <el-menu-item index="6">我收到的赞</el-menu-item>
            <el-menu-item class="myIndex" index="7" @click="toHome">首页</el-menu-item>
        </el-menu>
    </div>

</template>

<script>
    export default {
        name: "UserNavbar",
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            toHome(){
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    .myIndex{
        float: right;
    }
</style>