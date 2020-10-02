<template>
    <div class="nk-container">
        <!-- 头部 -->
        <Navbar></Navbar>


        <div class="main">

            <!--帖子内容-->
            <div class="container">
                <!--帖子标题-->
                <h3 class="mb-4">
                    <span v-text="postVo.post.title"></span>
                    <div class="float-right">
                        <button v-if="this.$store.state.isLogin" type="button" class="btn btn-danger btn-sm" id="topBtn"
                                :disabled="postVo.post.type==1" @click="setTop">置顶</button>
                        <button v-if="this.$store.state.isLogin" type="button" class="btn btn-danger btn-sm" id="wonderfulBtn"
                                :disabled="postVo.post.status==1" @click="setWonder">加精</button>
                        <button v-if="this.$store.state.isLogin" type="button" class="btn btn-danger btn-sm" id="deleteBtn"
                                :disabled="postVo.post.status==2" @click="setDelete">删除</button>
                    </div>
                </h3>

                <!-- 作者 -->
                <div class="media pb-3 border-bottom">
                    <!--用户头像-->
                    <router-link :to="{name: 'Profile' ,params: {uid : postVo.user.id}}">
                        <el-avatar  :src="uploadPath+postVo.user.avatar"></el-avatar>
                    </router-link>


                    <div class="media-body">
                        <!--用户名-->
                        <router-link :to="{name: 'Profile' ,params: {uid : postVo.user.id}}">
                            <div class="mt-0 text-warning" v-text="postVo.user.username"></div>
                        </router-link>
                        <div class="text-muted mt-3">
                            发布于 <b v-text="postVo.post.createTimeStr"></b>
                            <ul class="d-inline float-right">
                                <li class="d-inline ml-2" @click="collect(postVo.post.id)">
                                    <a href="javascript:;">
                                        <b v-text="collectStatus == 0 ? '收藏 ':'取消收藏 '"></b>
                                        <i v-text="postVo.post.collectCount"></i>
                                    </a>
                                </li>
                                <li class="d-inline ml-2">|</li>
                                <li class="d-inline ml-2" @click="like($event.currentTarget,1,postVo.post.id,postVo.post.userId,postVo.post.id)">
                                    <a href="javascript:;">
                                        <b v-text="likeStatus == 0 ? '赞 ':'已赞 '"></b>
                                        <i v-text="postVo.post.likeCount"></i>
                                    </a>
                                </li>
                                <li class="d-inline ml-2">|</li>
                                <li class="d-inline ml-2">回帖 <i v-text="postVo.post.commentCount"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 正文 -->
                <div class="mt-4 mb-3 content " v-text="postVo.post.content">
                </div>

                <!--展示图片-->
                <div>
                    <div class="block" v-for="p in pictures">
                        <el-image :src="picturePath+p"></el-image>
                    </div>
                </div>

                <br>
                <hr>

            </div>

            <!--评论列表-->
            <div class="container mt-3">

                <!-- 回帖数量 -->
                <div class="row">
                    <div class="col-8">
                        <h6><b class="square"></b> <i v-text="postVo.post.commentCount"></i>条回帖</h6>
                    </div>
                </div>

                <!-- 回帖列表 -->
                <ul class="list-unstyled mt-4">
                    <!--一级评论列表-->
                    <li class="media pb-3 pt-3 mb-3 border-bottom" v-for="commentVo in comments">

                        <!--用户头像-->
                        <router-link :to="{name: 'Profile' ,params: {uid : commentVo.user.id}}">
                            <el-avatar  :src="uploadPath+commentVo.user.avatar"></el-avatar>
                        </router-link>

                        <div class="media-body">
                            <div class="mt-0">
                                <!--用户名-->
                                <router-link :to="{name: 'Profile' ,params: {uid : commentVo.user.id}}">
                                    <span class="font-size-12 text-success" v-text="commentVo.user.username"></span>
                                </router-link>
                            </div>
                            <!--评论内容-->
                            <div class="mt-2" v-text="commentVo.comment.content">
                            </div>
                            <div class="mt-4 text-muted font-size-12">
                                <!--发布时间-->
                                <span>发布于 <b v-text="commentVo.comment.createTime"></b></span>
                                <ul class="d-inline float-right">
                                    <li class="d-inline ml-2" @click="like($event.currentTarget,2,commentVo.comment.id,commentVo.user.id,postVo.post.id)">
                                        <a href="javascript:;">
                                            <b v-text="commentVo.comment.likeStatus == 0 ? '赞 ':'已赞 '"></b>
                                            <i v-text="commentVo.comment.likeCount"></i>
                                        </a>
                                    </li>
                                    <li class="d-inline ml-2">|</li>
                                    <li class="d-inline ml-2">
                                        <!--第1个参数是entityId，第2个参数是targetId-->
                                        <a v-b-toggle="'myReply'+commentVo.comment.id" @click="ReplyData(commentVo.comment.id,0)" class="m-1">
                                            回复(<i v-text="commentVo.replyCount"></i>)
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <!-- 回复列表 -->
                            <ul class="list-unstyled mt-4 bg-gray p-3 font-size-12 text-muted">

                                <li class="pb-3 pt-3 mb-3 border-bottom" v-for="replyVo in commentVo.replies">
                                    <div>
										<span v-if="replyVo.target == null">
                                            <router-link :to="{name: 'Profile' ,params: {uid : replyVo.user.id}}">
											    <b class="text-info" v-text="replyVo.user.username"></b>:&nbsp;&nbsp;
                                            </router-link>
										</span>
                                        <span v-else>
											<i class="text-info" v-text="replyVo.user.username"></i> 回复
											<b class="text-info" v-text="replyVo.target.username"></b>:&nbsp;&nbsp;
										</span>
                                        <!--回复内容-->
                                        <span v-text="replyVo.reply.content"></span>
                                    </div>
                                    <div class="mt-3">
                                        <!--回复时间-->
                                        <span v-text="replyVo.reply.createTime"></span>
                                        <ul class="d-inline float-right">
                                            <li class="d-inline ml-2" @click="like($event.currentTarget,2,replyVo.reply.id,replyVo.user.id,postVo.post.id)">
                                                <a href="javascript:;">
                                                    <b v-text="replyVo.reply.likeStatus == 0 ? '赞 ':'已赞 '"></b>
                                                    <i v-text="replyVo.reply.likeCount"></i>
                                                </a>
                                            </li>
                                            <li class="d-inline ml-2">|</li>
                                            <li class="d-inline ml-2">
                                                <!--第1个参数是entityId，第2个参数是targetId-->
                                                <a v-b-toggle="'myReply'+commentVo.comment.id" @click="ReplyData(commentVo.comment.id,replyVo.user.id)" class="m-1">回复</a>
                                            </li>
                                        </ul>
                                    </div>

                                </li>

                                <!-- 回复输入框 -->
                                <b-collapse  :id="'myReply'+commentVo.comment.id">
                                    <li class="pb-3 pt-3">
                                        <div>
                                            <input style="width: 55%" type="text" placeholder="回复字数不可超过100" class="input-size" v-model="replyContent" />
                                        </div>
                                        <div class="text-lg-center mt-2">
                                            <button type="submit" class="btn btn-primary btn-sm" @click="replyTwo" >&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
                                        </div>
                                    </li>
                                </b-collapse>

                            </ul>
                        </div>
                    </li>
                </ul>

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


            <!-- 回帖输入 -->
            <div class="myComment">
                    <p>
                        <textarea class="CommentInput"   placeholder="在这里畅所欲言你的看法吧,评论字数不可超过100" v-model="commentContent"></textarea>
                    </p>
                    <p >
                        <button type="submit" class="btn btn-primary btn-sm" @click="commentPost()">&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</button>
                    </p>
            </div>


        </div><!--main 的div结束-->


    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "PostDetail",
        components:{
            Navbar
        },
        data(){
            return{
                postVo:{},
                comments:{},
                uploadPath:this.$axios.defaults.baseURL,
                picturePath:'http://47.115.88.155',
                pictures:{},

                entityType:'',
                entityId:'',
                commentUid:'',
                targetId:'',
                replyContent:'',
                commentContent:'',

                //帖子点赞状态
                likeStatus:0,
                collectStatus:0,


                //分页数据
                currentPage: 1,
                total: 0,
                pageSize: 5
            }
        },
        created() {
            const _this = this;
            //提交表单
            this.$axios({
                method:'get',
                url:'/post/detail/'+this.$route.params.pid,
            }).then(function(res){
                _this.postVo = res.data.data.postVo;
                _this.comments = res.data.data.comments;
                _this.pictures = res.data.data.pictures;
                _this.likeStatus = res.data.data.likeStatus;
                _this.collectStatus = res.data.data.collectStatus;
                //分页数据
                _this.total=res.data.data.postVo.post.commentCount
            }).catch(function(error){
                console.log(error);
            });
        },
        methods:{
            fail(msg) {
                this.$message.error(msg);
            },
            //评论帖子
            commentPost(){
                if (this.commentContent.length > 100){
                    this.fail("评论字数不可超过100！");
                    return;
                }
                const _this = this;
                this.$axios({
                    method:'post',
                    url:'/comment/add',
                    data:{
                        entityType:1,
                        entityId:this.$route.params.pid,
                        targetId:0,
                        content:this.commentContent,
                        postId:this.$route.params.pid
                    }
                }).then(function(res){
                    _this.commentContent = "";
                    console.log(res)
                    if (res.status == 200){
                        _this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        //刷新页面
                        _this.$router.go(0);
                    }
                }).catch(function(error){
                    console.log(error);
                });
            },

            //回复二级评论
            replyTwo(){
                if (this.replyContent.length > 100){
                    this.fail("回复字数不可超过100！");
                    return;
                }
                const _this = this;
                if (this.$store.state.isLogin){
                    this.$axios({
                        method:'post',
                        url:'/comment/add',
                        data:{
                            entityType:2,
                            entityId:_this.entityId,
                            targetId:_this.targetId,
                            content:_this.replyContent,
                            postId:this.$route.params.pid
                        }
                    }).then(function(res){
                        _this.replyContent = "";
                        if (res.status == 200){
                            _this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                            //刷新页面
                            _this.$router.go(0);
                        }
                    }).catch(function(error){
                        console.log(error);
                    });
                }else {
                    alert("您尚未登录，不能回复！");
                }
            },
            //确定被回复对象
            //第1个参数是entityId，第2个参数是targetId
            ReplyData(rId,rUid){
                this.entityId = rId;
                this.targetId = rUid;
            },
            //评论分页
            page(currentPage) {
                const _this = this;
                this.$axios({
                    method:'post',
                    url:'/post/comment/list',
                    data:{
                        currentPage:currentPage,
                        pid:this.$route.params.pid
                    }
                }).then(function(res){
                    _this.comments = res.data.data.records;
                    _this.currentPage = res.data.data.currentPage
                    _this.total = res.data.data.total

                }).catch(function(error){
                    console.log(error);
                });
            },
            //点赞
            like(event,entityType, entityId,entityUserId,postId){
                if (!this.$store.state.isLogin || this.$store.state.isLogin==''){
                    this.$message.error('要登录才能点赞哦');
                    return;
                }
                //发送请求
                let _this = this;
                console.log(event);

                this.$axios({
                    method:'post',
                    url:'/like',
                    data:{
                        entityType:entityType,
                        entityId:entityId,
                        entityUserId:entityUserId,
                        postId:postId
                    }
                }).then(function(res){
                    if (res.data.code == 200){
                        const myData = res.data.data;
                        console.log(myData)
                        //更新帖子点赞数
                        if (myData.entityType == 1){
                            _this.postVo.post.likeCount = myData.likeCount
                            _this.likeStatus = myData.likeStatus
                        }else {
                            //更新评论点赞数,重新查询评论
                            event.firstChild.lastChild.innerHTML= myData.likeCount
                        }


                    }else{
                        _this.fail(res.data.msg)
                    }

                }).catch(function(error){
                    console.log(error);
                });
            },
            //置顶
            setTop(){
                const _this = this;
                _this.$axios.get("/post/top?id="+_this.postVo.post.id).then(res => {
                    console.log(res)
                    if (res.data.code == 200){
                        _this.postVo.post.type = 1;
                    }else {
                        _this.fail(res.data.msg)
                    }
                })
            },
            //精选
            setWonder(){
                const _this = this;
                _this.$axios.get("/post/wonderful?id="+_this.postVo.post.id).then(res => {
                    console.log(res)
                    if (res.data.code == 200){
                        _this.postVo.post.status = 1;
                    }else {
                        _this.fail(res.data.msg)
                    }
                })
            },
            //删除
            setDelete(){
                const _this = this;
                _this.$axios.get("/post/delete?id="+_this.postVo.post.id).then(res => {
                    if (res.data.code != 200){
                        _this.fail(res.data.msg)
                    }else{
                        _this.$router.push("/");
                    }
                })
            },
            //收藏
            collect(pid){
                if (!this.$store.state.isLogin || this.$store.state.isLogin==''){
                    this.$message.error('要登录才能收藏哦');
                    return;
                }
                //发送请求
                let _this = this;
                let path = '';
                if (_this.collectStatus == 0){
                    path = '/collect'
                }else {
                    path = '/uncollect'
                }

                this.$axios({
                    method:'post',
                    url:path,
                    data:{
                        entityId:pid,
                        entityUserId:_this.postVo.user.id
                    }
                }).then(function(res){
                    if (res.data.code == 200){
                        const myData = res.data.data;
                        console.log(myData)
                        //更新帖子收藏数
                        _this.postVo.post.collectCount = myData.collectCount
                        _this.collectStatus = myData.collectStatus
                    }else{
                        _this.fail(res.data.msg)
                    }

                }).catch(function(error){
                    console.log(error);
                });
            }
        }

    }
</script>


<style scoped>
    .myComment{
        margin-left: 200px;
        margin-top: 20px;
    }

    .CommentInput{
        width: 80%;
    }

    .mpage {
        margin: 0 auto;
        text-align: center;

    }
</style>