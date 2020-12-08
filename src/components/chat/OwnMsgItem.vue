<template>
    <div class="own-msg-item" @click="setRead" :style="bgc">
<!--        <span><a :href="/mine/ + this.item.fromId"><img :src="this.ownUrl"></a></span>-->
        <span><img :src="this.ownUrl"></span>
        <div class="r-top">
            <span class="msg-content">{{msgText}}</span>
        </div>
        <div class="time">{{extime}}</div>
    </div>
</template>

<script>
    // import moment from 'moment';
    // import {setAlreadyRead} from "../../../network/auth";
    // import JSONbig from "json-bigint";
    // import {getEntityUserInfo} from "../../../network/auth";

    export default {
        name: "OwnMsgItem",
        data() {
            return {
                // info: JSON.parse(this.item.content),
                isRead: false,
                url: "http://qjavcyfnj.hn-bkt.clouddn.com/F.png"
            }
        },
        props: {
            item: {
                type: Object,
                default() {
                }
            },

            msgText: {
                type: String,
                default: ''
            },


            ownUrl: {
                type: String
                // default: 'https://upload.jianshu.io/users/upload_avatars/24326020/3608d730-a51f-4389-960c-814649c5c78b.png?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144/format/webp'
            }


        },
        computed: {
            extime() {
                // return moment(this.item.createTime).format("YYYY-MM-DD HH:mm:ss")
                return "ss"
            },

            bgc() {
                return this.isRead ? {'background-color': '#fff'} : {'background-color': '#fff'}
            }


        },
        methods: {
            setRead() {
                // 设置已读
                if (!this.isRead) {
                    let data = {
                        'messageId': this.item.id
                    }
                    // setAlreadyRead(data).then(res => {
                    //     // alert(res.status)
                    //     if (res.status == 200) {
                    //         this.isRead = true;
                    //     }
                    // })
                }


            }
        },

        created() {
            // getEntityUserInfo(this.item.fromId).then(res => {
            //     this.url = res.data.avatarUrl;
            // });


        }
    }
</script>

<style scoped>


    .own-msg-item {
        width: 100%;
        position: relative;
        overflow: hidden;
        float: right;
        margin-left: 20px;
        padding-top: 20px;
        padding-bottom: 30px;
        /*border-top: 1px solid #f0f0f0;*/
        /*background-color: #f6fbff;*/
        border-radius: 5px;
        padding-left: 16px;
    }

    .own-msg-item .r-top {
        float: right;
        display: inline-block;
        position: relative;
        top: 4px;
        left: 12px;
        font-size: 15px;
        color: #333;
    }

    .own-msg-item img {
        float: right;
        width: 40px;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 50%;
        vertical-align: top;
        overflow: hidden;
    }

    .own-msg-item .user {
        margin: 0 5px 0 0;
        color: #333;

    }

    .own-msg-item .article {
        color: #3194d0;
    }

    .own-msg-item .time {
        float: right;
        /*margin-top: 62px;*/
        font-size: 12px;
        position: absolute;
        top: 66px;
        left: 396px;
        color: #969696;
        line-height: normal;
    }

    .own-msg-item .msg-content {
        box-sizing: border-box;
        float: right;
        margin-right: 20px;
        min-height: 39px;
        min-width: 50px;
        line-height: 39px;
        margin-top: -2px;
        background-color: #eee;
        padding: 1px 10px;
        border-color: #d9d9d9;
        border-radius: 4px 0 4px 4px;
    }

</style>