<template>
    <div class="opposite-msg-item" @click="setRead" :style="bgc">
<!--        <span><a :href="/mine/ + this.item.fromId"><img :src="oppositeUrl"></a></span>-->
        <span><img :src="oppositeUrl"></span>
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
        name: "OppositeMsgItem",
        data() {
            return {
                // info: JSON.parse(this.item.content),
                isRead: false,
                url: {
                    type:String,
                    default: 'http://qjavcyfnj.hn-bkt.clouddn.com/F.png'
                },
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

            oppositeUrl: {
                type: String,
                default: 'http://qjavcyfnj.hn-bkt.clouddn.com/F.png'
            }


        },
        computed: {
            extime() {
                 // return moment(this.item.createTime).format("YYYY-MM-DD HH:mm:ss")
                return 'sss';
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
            //     this.$emit("getName",res.data.nickname);
            // });
        }
    }
</script>

<style scoped>


    .opposite-msg-item {
        width: 100%;
        position: relative;
        overflow: hidden;
        float: left;
        margin-left: 20px;
        padding-top: 20px;
        padding-bottom: 30px;
        /*border-top: 1px solid #f0f0f0;*/
        /*background-color: #f6fbff;*/
        border-radius: 5px;
        padding-left: 16px;
    }

    .opposite-msg-item .r-top {
        float: left;
        display: inline-block;
        position: relative;
        top: 4px;
        left: 12px;
        font-size: 15px;
        color: #333;
    }

    .opposite-msg-item img {
        float: left;
        width: 40px;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 50%;
        vertical-align: top;
        overflow: hidden;
    }

    .opposite-msg-item .user {
        margin: 0 5px 0 0;
        color: #333;

    }

    .opposite-msg-item .article {
        color: #3194d0;
    }

    .opposite-msg-item .time {
        float: left;
        /*margin-top: 62px;*/
        font-size: 12px;
        position: absolute;
        top: 66px;
        left: 72px;
        color: #969696;
        line-height: normal;
    }

    .opposite-msg-item .msg-content {
        box-sizing: border-box;
        float: left;
        margin-right: 20px;
        min-height: 39px;
        line-height: 39px;
        background-color: #e7f1fc;
        border-color: #bad0e9;
        border-radius: 0 4px 4px 4px;
        margin-top: -2px;
        padding: 1px 10px;
    }

</style>