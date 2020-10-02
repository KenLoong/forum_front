<template>
    <div>
        <Navbar active-index="0"></Navbar>
        <div>
            <h3>这是本人自己原创的项目，采用前后端分离，希望可以为大家创造一个畅所欲言的社区。
            </h3>
            <br>
            <h3>如果有什么问题，欢迎大家在我的博客上联系我</h3>
            博客链接：<a href="https://segmentfault.com/u/kenloong">ken博客</a>
        </div>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "Ken",
        components:{
            Navbar
        }
    }
</script>

<style scoped>

</style>