<template>
    <div class="container">
        <div class="row h-100 " >
            <div class="col-3">
                    <ul>
                        <li v-for="item in userList">
                            <div>
                                <div>
                                    <el-badge>
                                        <el-image class="avatar"
                                                  :src="item.avatar"
                                                  :alt="item.username"
                                        >
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                    </el-badge>
                                    <p class="name">{{item.username}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>

            </div>
            <div class="col-9">
                <h2>聊天页面</h2>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "ChatMe",
        data() {
            const _this = this;
            return {
                userList: _this.$store.state.userList
            }
        },
        methods:{

        },
        created() {

        }
    }
</script>

<style  scoped>
</style>
